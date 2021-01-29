import { saveOutline } from 'ionicons/icons';
import React, { FC, Fragment, MutableRefObject, ReactFragment, useCallback, useMemo, useRef, useState } from 'react';
import Validator, { PropertyDefinitionRef } from 'validator';
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
import AppFormToggle from '../AppFormToggle';

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
    showFields?: string[]
    autoSubmit?: boolean
    customSubmit?: ReactFragment
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
    const { validator, data, onSubmit, children, lockedFields, hiddenFields,
        description, title, requiredOnly, calculatedFields, showFields,
        customSubmit, autoSubmit } = props
    const { schema } = validator;
    const instance = useRef<any>({ ...data })
    const [isValid, setIsValid] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    const handleInputReceived: formFieldChangeEvent = useCallback((property: string, value: any) => {

        let change: Record<string, any> = {}
        change[property] = value === "" ? undefined : value;
        const calculateProperties = calculatedFields && calculatedFields.map[property];

        if (calculateProperties) {
            const calculatedFieldValue = calculateProperties({ property, value });
            change = { ...change, [calculatedFieldValue.property]: calculatedFieldValue.value }
        }

        instance.current = { ...instance.current, ...change }
        setIsValid(validator.validate(instance.current))
        const allErrors = validator.validate.errors || []
        const allErrorMessages = allErrors.map(x => x.message || "").filter(x => x.length < 2);
        const propertyErrors = allErrors.map(error => typeof (error.message) === "string" ? error.message : "").filter(errorMessage => errorMessage.includes(property));
        if (propertyErrors.length === 0) {
            if (allErrorMessages.length !== 0) {
                setErrors(allErrorMessages);
            } else {
                autoSubmit && onSubmit(instance.current);
            }
            return ["valid", undefined]
        } else {
            return ["invalid", propertyErrors]
        }
    }, [calculatedFields, validator]);

    const ComposeNestedFormElement: React.FC<nestedFormProps> = ({ propertyInfo, instanceRef, onChange }) => {
        const { property } = propertyInfo;
        console.log(property);
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
                        onSubmit={(nestedObjectValue) => {
                            onChange(property, nestedObjectValue);
                            setShowNestedFrom(false);
                        }}
                    ><AppBackButton onClick={() => setShowNestedFrom(false)} />
                    </AppFormComposer>}
                </AppContent>
            </AppModal>

        </AppRow>
    }


    const FormElement: React.FC<formElementProps> = ({ instanceRef, property, validator }) => {
        console.log("Make Form element", property);
        let propertyInfo = schema.properties && schema.properties[property];
        if (typeof propertyInfo === "undefined") {
            throw new Error("Undefined property... is your JSON schema OK?");
        }
        propertyInfo = { ...propertyInfo, ...validator.getReferenceInformation(propertyInfo) } as PropertyDefinitionRef;
        console.log(propertyInfo);
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
        if (propertyType === "boolean") {
            return <AppFormToggle
                instanceRef={instanceRef}
                propertyInfo={propertyInfo as any}
                property={property}
                onChange={handleInputReceived}
                key={property}
            />
        }

        if ("items" in propertyInfo || propertyType === "array") {
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
                propertyInfo={propertyInfo}
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
    const requiredProperties = schema.required || [];
    const optionalFields = !requiredOnly ? schemaProperties.filter(x => !requiredProperties.includes(x)) : [];
    let requiredFields = schema.required ? schemaProperties.filter(x => requiredProperties.includes(x)) : []
    requiredFields = showFields ? [...requiredFields, ...showFields] : requiredFields;
    const RequiredFormFields = () => <>{
        requiredFields.map(property => {
            if (lockedFields && lockedFields.includes(property))
                return <LockedField key={property} property={property} value={instance.current[property]} />
            if (hiddenFields && hiddenFields.includes(property))
                return <Fragment key={property}></Fragment>
            return <FormElement key={property} onChange={handleInputReceived} validator={validator} instanceRef={instance} property={property} />
        })}</>


    const OptionalFormFields: React.FC = () => <>{
        optionalFields.map(property => {
            if (lockedFields && lockedFields.includes(property))
                return <LockedField property={property} value={instance.current[property]} />
            if (hiddenFields && hiddenFields.includes(property))
                return <Fragment key={property}></Fragment>

            return <FormElement key={property} onChange={handleInputReceived} validator={validator} instanceRef={instance} property={property} />
        })}</>


    return <>
        <AppCard contentColor={"light"} title={<>
            <AppToolbar color="clear">
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
                {useMemo(() => <RequiredFormFields />, [])}
            </AppList>

            {<AppList>
                {!requiredOnly && optionalFields.length > 0 && <AppLabel color="medium">
                    Optional Fields
                </AppLabel>}
                {useMemo(() => <OptionalFormFields />, [])}
            </AppList>}

            <AppToolbar color="clear">
                <AppButtons slot="start">
                    {errors.slice(0, 1).map(error => <AppChip color='danger'>
                        {error}
                    </AppChip>)}
                </AppButtons>
                <AppButtons slot="end">
                    {useMemo(() => !autoSubmit ? <AppButton fill="solid" color={isValid ? "favorite" : "primary"} disabled={!isValid} onClick={() => {
                        onSubmit(instance.current);
                    }}>
                        {!customSubmit ? <>
                            <AppLabel>
                                Save
                        </AppLabel>
                            <AppIcon icon={saveOutline} /></> : customSubmit}
                    </AppButton> : <></>, [autoSubmit, customSubmit, isValid, onSubmit])}
                </AppButtons>
            </AppToolbar>

        </AppCard >
    </>
};
export default AppFormComposer;