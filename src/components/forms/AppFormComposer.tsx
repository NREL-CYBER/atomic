import { ErrorObject } from 'ajv';
import {
    AppBackButton, AppButton, AppButtons,
    AppCard, AppChip, AppCol,
    AppContent,

    AppFormArrayInput, AppFormInput, AppFormSelect,
    AppIcon, AppItem, AppLabel,
    AppList,
    AppModal, AppRow,
    AppText,
    AppTitle, AppToolbar, AppUuidGenerator
} from '..';
import Validator from 'validator';
import { saveOutline } from 'ionicons/icons';
import React, { FC, Fragment, memo, MutableRefObject, ReactFragment, useRef, useState, useMemo, useCallback } from 'react';
import { titleCase } from '../../util';



export interface propertyKeyValue {
    property: string,
    value: string
}
export interface calculatedPropertyMap {
    map: Record<string, (base: propertyKeyValue) => propertyKeyValue>
}

export interface formComposerProps {
    validator: Validator<any>,
    data: any,
    onSubmit: (validData: any) => void,
    children?: ReactFragment,
    lockedFields?: string[]
    hiddenFields?: string[]
    calculatedFields?: calculatedPropertyMap
    description?: string
    title?: string
    requiredOnly?: boolean
}

interface formElementProps {
    property: string
    instanceRef: MutableRefObject<any>
    validator: Validator<any>
    onValid: (property: string) => void
}

interface nestedFormProps {
    instanceRef: any
    propertyInfo: any
    onValid: (property: string) => void
}

interface lockedFieldProps {
    property: string,
    value: string | []
}

const LockedField: FC<lockedFieldProps> = ({ property, value }) => <AppItem>
    <AppButtons slot="start">
        <AppLabel position="stacked" color={"favorite"} >
            <AppCol>
                {titleCase(property)}
            </AppCol>
            <AppCol>
                <AppChip>
                    {typeof value === "object" ? value.map(x => x) : value}
                </AppChip>
            </AppCol>
        </AppLabel>
    </AppButtons>
</AppItem>


const AppFormComposer = (props: formComposerProps) => {
    const { validator, data, onSubmit, children, lockedFields, hiddenFields, description, title, requiredOnly, calculatedFields } = props
    const { schema } = validator;
    const instance = useRef<any>({ ...data })

    const handleValidInputReceived = useCallback(() => (property: string) => {
        console.log(property);

        if (calculatedFields && Object.keys(calculatedFields.map).includes(property)) {
            const calculation = calculatedFields.map[property]({ property, value: instance.current[property] });
            instance.current[calculation.property] = calculation.value;
        }
        const validity = validator.validate(instance.current);
        if (validity === false) {
            validator.validate.errors && setErrors(validator.validate.errors)
        } else {
            setErrors([]);
        }
        setIsValid(validity);
    }, [calculatedFields, validator])

    const ComposeNestedFormElement: React.FC<nestedFormProps> = ({ propertyInfo, instanceRef, onValid }) => {
        const { property } = propertyInfo;
        const [showNestedForm, setShowNestedFrom] = useState(false);
        return <AppRow>
            <AppButton fill="outline" onClick={() => setShowNestedFrom(x => !x)} >
                {propertyInfo.property}
            </AppButton>
            <AppModal onDismiss={() => setShowNestedFrom(false)} isOpen={showNestedForm}>
                <AppContent>
                    {showNestedForm && <AppFormComposer
                        data={{ ...instanceRef.current[property] }}
                        validator={validator.makeReferenceValidator(propertyInfo)}
                        onSubmit={(e) => {
                            instanceRef.current[property] = e;
                            onValid(property);
                            setShowNestedFrom(false);
                        }}
                    ><AppBackButton onClick={() => setShowNestedFrom(false)} />
                    </AppFormComposer>}
                </AppContent>
            </AppModal>

        </AppRow>
    }


    const ComposeFormElement = (props: formElementProps) => {
        const { instanceRef, property, validator } = props;


        let propertyInfo = schema.properties && schema.properties[property];
        if (typeof propertyInfo === "undefined") {
            throw new Error("Undefined property... is your JSON schema OK?");
        }
        propertyInfo = { ...propertyInfo, ...validator.getReferenceInformation(propertyInfo) };
        const propertyType = propertyInfo["type"] || "object";
        if (property === "uuid") {
            return <AppUuidGenerator
                validator={validator}
                instanceRef={instanceRef} />
        }

        if ("enum" in propertyInfo) {
            return <AppFormSelect
                instanceRef={instanceRef}
                propertyInfo={propertyInfo}
                property={property}
                validator={validator}
                onValid={handleValidInputReceived}
                key={property}
            />
        }
        if ("items" in propertyInfo) {
            return <AppFormArrayInput
                onValid={handleValidInputReceived}
                instanceRef={instanceRef}
                propertyInfo={propertyInfo as any}
                property={property}
                validator={validator}
                key={property}
            />
        }

        if (propertyType === "string") {
            return <AppFormInput
                input={"text"}
                validator={validator}
                instanceRef={instanceRef}
                property={property}
                onValid={handleValidInputReceived}
                key={property}
            />

        }

        if (propertyType === "object") {
            return <ComposeNestedFormElement onValid={handleValidInputReceived} instanceRef={instanceRef} propertyInfo={propertyInfo} />
        }
        return <></>

    }

    const [schemaProperties] = useState<string[]>(Object.keys({ ...schema.properties }));


    const [errors, setErrors] = useState<ErrorObject[]>();
    const optionalFields = schema.required ? schemaProperties.filter(x => !schema.required.includes(x)) : [];
    const requiredFields = schema.required ? schemaProperties.filter(x => schema.required.includes(x)) : schemaProperties;
    const [isValid, setIsValid] = useState(false);
    return <>
        <AppCard title={<>
            <AppToolbar>
                <AppButtons slot="start">
                    {children}
                    <AppTitle color={isValid ? "favorite" : "tertiary"}>
                        {title ? title : titleCase(schema.title || "")}
                    </AppTitle>
                </AppButtons>
            </AppToolbar>
        </>}>
            <AppList>
                <AppItem>
                    <AppText color="medium">
                        {description ? description : schema.description}
                    </AppText>
                </AppItem>
                {/**Compose required fields */}
                {useMemo(() => requiredFields.map(property => {
                    if (lockedFields && lockedFields.includes(property))
                        return <LockedField key={property} property={property} value={instance.current[property]} />
                    if (hiddenFields && hiddenFields.includes(property))
                        return <Fragment key={property}></Fragment>
                    return <ComposeFormElement key={property} onValid={handleValidInputReceived} validator={validator} instanceRef={instance} property={property} />
                }), [handleValidInputReceived, hiddenFields, lockedFields, requiredFields, validator])}
            </AppList>

            {<AppList>
                {!requiredOnly && optionalFields.length > 0 && "HIDE THESE FIELDS"}
                {/**Compose optional fields */}
                {useMemo(() => optionalFields.map(property => {
                    if (lockedFields && lockedFields.includes(property))
                        return <LockedField property={property} value={instance.current[property]} />
                    if (hiddenFields && hiddenFields.includes(property))
                        return <Fragment key={property}></Fragment>

                    return <ComposeFormElement key={property} onValid={handleValidInputReceived} validator={validator} instanceRef={instance} property={property} />
                }), [handleValidInputReceived, hiddenFields, lockedFields, optionalFields, validator])}
            </AppList>}

            <AppToolbar>
                <AppButtons slot="start">
                    {errors && errors.map(error => <AppItem key={error.message}>
                        <AppChip color="warning">
                            {error.schemaPath.split("/").pop()}
                        </AppChip>
                        <AppText>
                            {error.message}
                        </AppText>

                    </AppItem>)}

                </AppButtons>
                <AppButtons slot="end">
                    <AppButton fill="solid" color={isValid ? "favorite" : "primary"} disabled={!isValid} onClick={() => {
                        onSubmit(instance.current);
                    }}>
                        <AppLabel>
                            Save
                        </AppLabel>
                        <AppIcon icon={saveOutline} />
                    </AppButton>
                </AppButtons>
            </AppToolbar>

        </AppCard >
    </>
};
export default memo(AppFormComposer);