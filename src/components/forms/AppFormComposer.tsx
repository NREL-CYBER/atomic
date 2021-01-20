import { saveOutline } from 'ionicons/icons';
import cloneDeep from "lodash/cloneDeep";
import React, { FC, Fragment, MutableRefObject, ReactFragment, useCallback, useRef, useState, useMemo } from 'react';
import Validator from 'validator';
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
import { titleCase } from '../../util';

export interface propertyKeyValue {
    property: string,
    value: string
}
export interface calculatedPropertyMap {
    map: Record<string, (base: propertyKeyValue) => propertyKeyValue>
}

export interface formComposerProps {
    validator: Validator<unknown>
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

export type formFieldValidationStatus = [formFieldStatus, string[] | undefined]
export type formFieldChangeEvent = (property: string, value: any) => formFieldValidationStatus;

interface formElementProps {
    property: string
    instanceRef: MutableRefObject<any>
    validator: Validator<any>
    onChange: formFieldChangeEvent
}

interface nestedFormProps {
    instanceRef: any
    propertyInfo: any
    onChange: formFieldChangeEvent
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
export type formFieldStatus = "valid" | "invalid" | "empty";



const AppFormComposer: React.FC<formComposerProps> = (props) => {
    const { validator, data, onSubmit, children, lockedFields, hiddenFields, description, title, requiredOnly } = props
    const { schema } = validator;
    const [subValidator] = useState(cloneDeep(validator));
    const instance = useRef<any>({ ...data })
    const [isValid, setIsValid] = useState<boolean>(false);
    const handleInputReceived: formFieldChangeEvent = useCallback((property: string, value: any) => {
        console.log(property, "changed");
        const change: Record<string, any> = {}
        change[property] = value === "" ? undefined : value;
        instance.current = { ...instance.current, ...change }
        setIsValid(validator.validate(instance.current))
        const allErrors = validator.validate.errors || []

        const propertyErrors = allErrors.map(error => typeof (error.message) === "string" ? error.message : "").filter(errorMessage => errorMessage.includes(property));
        if (propertyErrors.length === 0) {
            return ["valid", undefined]
        } else {
            return ["invalid", propertyErrors]
        }
    }, [validator]);

    const ComposeNestedFormElement: React.FC<nestedFormProps> = ({ propertyInfo, instanceRef, onChange }) => {
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
                        validator={subValidator.makeReferenceValidator(propertyInfo)}
                        onSubmit={(nestedObjectValue) => {
                            const [validationStatus, validationErrors] = onChange(property, nestedObjectValue);
                            console.log(validationStatus);
                            setShowNestedFrom(false);
                        }}
                    ><AppBackButton onClick={() => setShowNestedFrom(false)} />
                    </AppFormComposer>}
                </AppContent>
            </AppModal>

        </AppRow>
    }


    const FormElement = (props: formElementProps) => {
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
                onChange={handleInputReceived}
                key={property}
            />
        }
        if ("items" in propertyInfo) {
            return <AppFormArrayInput
                onChange={handleInputReceived}
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
                instanceRef={instanceRef}
                property={property}
                onChange={handleInputReceived}
                key={property}
            />

        }

        if (propertyType === "object") {
            return <ComposeNestedFormElement onChange={handleInputReceived} instanceRef={instanceRef} propertyInfo={propertyInfo} />
        }
        return <></>

    }

    const [schemaProperties] = useState<string[]>(Object.keys({ ...schema.properties }));

    const optionalFields = schema.required ? schemaProperties.filter(x => !schema.required.includes(x)) : [];
    const requiredFields = schema.required ? schemaProperties.filter(x => schema.required.includes(x)) : [];
    const RequiredFormFields = () => <>{
        requiredFields.map(property => {
            if (lockedFields && lockedFields.includes(property))
                return <LockedField key={property} property={property} value={instance.current[property]} />
            if (hiddenFields && hiddenFields.includes(property))
                return <Fragment key={property}></Fragment>
            return <FormElement key={property} onChange={handleInputReceived} validator={subValidator} instanceRef={instance} property={property} />
        })}</>


    const OptionalFormFields = () => <>{
        optionalFields.map(property => {
            if (lockedFields && lockedFields.includes(property))
                return <LockedField property={property} value={instance.current[property]} />
            if (hiddenFields && hiddenFields.includes(property))
                return <Fragment key={property}></Fragment>

            return <FormElement key={property} onChange={handleInputReceived} validator={subValidator} instanceRef={instance} property={property} />
        })}</>


    return <>
        <AppCard title={<>
            <AppToolbar color={"light"}>
                <AppButtons slot="start">
                    {children}
                    {<AppTitle color={isValid ? "favorite" : "tertiary"}>
                        {title ? title : titleCase(schema.title || "")}
                    </AppTitle>}
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
                {useMemo(() => <RequiredFormFields />, [])}
            </AppList>

            {<AppList>
                {!requiredOnly && optionalFields.length > 0 && "Optional Fields"}
                {/**Compose optional fields */}
                {useMemo(() => <OptionalFormFields />, [])}
            </AppList>}

            <AppToolbar>
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
export default AppFormComposer;