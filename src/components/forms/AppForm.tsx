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
    AppModal,
    AppText,
    AppTitle, AppToolbar, AppUuidGenerator
} from '..';
import { titleCase } from '../../util';
import AppFormToggle from '../AppFormToggle';
import AppLastModifiedGenerator from './AppLastModifiedGenerator';
import AppFormDictionaryInput from './AppFormDictionaryInput';

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
    customComponentMap?: Record<string, React.FC<nestedFormProps>>
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
    property: string
    instanceRef: MutableRefObject<any>
    propertyInfo: PropertyDefinitionRef
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



const AppForm: React.FC<formComposerProps> = (props) => {
    const { validator, data, onSubmit, children, lockedFields, hiddenFields,
        description, title, requiredOnly, calculatedFields, showFields,
        customSubmit, autoSubmit, customComponentMap } = props
    const { schema } = validator;
    const instance = useRef<any>(schema.type === "object" ? { ...data } : schema.type === "array" ? [...data] : undefined)
    const [isValid, setIsValid] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    const handleInputReceived: formFieldChangeEvent = useCallback((property: string, value: any) => {
        if (schema.type === "string" || schema.type === "array") {
            instance.current = value;
        } else if (schema.type === "object") {
            instance.current[property] = value === "" ? undefined : value;
            const calculateProperties = calculatedFields && calculatedFields.map[property];
            if (calculateProperties) {
                const calculatedFieldValue = calculateProperties({ property, value });
                if (calculatedFieldValue.value) {
                    instance.current[calculatedFieldValue.property] = calculatedFieldValue.value;
                }
            }
        }
        setIsValid(validator.validate(instance.current))
        const allErrors = validator.validate.errors || []
        const propertyErrors = allErrors.filter(error => error.dataPath.includes(property)).map(x => x.message || "");
        setErrors(allErrors.map(x => x.schemaPath + " " + x.keyword + " " + x.dataPath + " " + x.message || ""))
        if (allErrors.length === 0) {
            autoSubmit && onSubmit(instance.current);
        }
        if (propertyErrors.length === 0) {
            return ["valid", undefined]
        } else {
            return ["invalid", propertyErrors]
        }
    }, [autoSubmit, calculatedFields, onSubmit, schema.type, validator]);

    const ComposeNestedFormElement: React.FC<nestedFormProps> = ({ propertyInfo, property, instanceRef, onChange }) => {
        const { title } = propertyInfo;
        const [showNestedForm, setShowNestedFrom] = useState(false);
        const [nestedFormStatus, setNestedFormStatus] = useState<formFieldStatus>("empty");
        const formated_title = titleCase((property || title || '').split("_").join(" "));
        return <AppItem>
            <AppButtons slot="start">
                <AppButton color={nestedFormStatus === "valid" ? "success" : "primary"} fill="outline" onClick={() => setShowNestedFrom(x => !x)} >
                    {formated_title}
                </AppButton>
            </AppButtons>
            <AppModal onDismiss={() => setShowNestedFrom(false)} isOpen={showNestedForm}>
                <AppContent>
                    {showNestedForm && <AppForm
                        data={instanceRef.current[property]}
                        validator={validator.makeReferenceValidator(propertyInfo)}
                        onSubmit={(nestedObjectValue) => {
                            setNestedFormStatus("valid");
                            onChange(property, nestedObjectValue);
                            setShowNestedFrom(false);
                        }}
                    ><AppBackButton onClick={() => setShowNestedFrom(false)} />
                    </AppForm>}
                </AppContent>
            </AppModal>

        </AppItem>
    }


    const FormElement: React.FC<formElementProps> = ({ instanceRef, property, validator }) => {
        const propertyInfo = schema.properties && schema.properties[property];
        if (typeof propertyInfo === "undefined") {
            throw new Error("Undefined property... is your JSON schema OK?");
        }
        const refPropertyInfo = validator.getReferenceInformation(propertyInfo) as PropertyDefinitionRef;
        const propertyType = propertyInfo.type ? propertyInfo.type : refPropertyInfo["type"];
        if (property.includes("import")) {
            return <></>
        }
        if (property === "uuid") {
            return <AppUuidGenerator
                instanceRef={instanceRef} />
        }
        if (property === "last_modified") {
            return <AppLastModifiedGenerator
                instanceRef={instanceRef} />
        }
        if (customComponentMap && customComponentMap[property]) {
            return customComponentMap[property]({ instanceRef, onChange: handleInputReceived, property, propertyInfo, children })
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
                propertyInfo={refPropertyInfo}
                property={property}
                onChange={handleInputReceived}
                key={property}
            />
        }

        if (propertyType === "array") {
            return <AppFormArrayInput
                onChange={handleInputReceived}
                instanceRef={instanceRef}
                propertyInfo={propertyInfo}
                property={property}
                validator={validator.makeReferenceValidator(propertyInfo)}
                key={property}
            />
        }

        if (propertyType === "object" && (propertyInfo as any).additionalProperties && (propertyInfo as any).additionalProperties.allOf) {
            return <AppFormDictionaryInput
                onChange={handleInputReceived}
                instanceRef={instanceRef}
                propertyInfo={propertyInfo}
                property={property}
                validator={validator.makeReferenceValidator(refPropertyInfo)}
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
            return <ComposeNestedFormElement
                onChange={handleInputReceived}
                instanceRef={instanceRef}
                property={property}
                propertyInfo={propertyInfo}
            />
        }
        return <AppChip color="danger">{property}</AppChip>

    }

    const [schemaProperties] = useState<string[]>(Object.keys({ ...schema.properties }));
    const requiredProperties = schema.required || [];
    const optionalFields = !requiredOnly ? schemaProperties.filter(x => !requiredProperties.includes(x)) : [];
    let requiredFields = schema.required ? schemaProperties.filter(x => requiredProperties.includes(x)) : []
    requiredFields = showFields ? [...requiredFields, ...showFields] : requiredFields;
    const [showOptional, setShowOptional] = useState<boolean>(false);
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
                {schema.type === "string" && <><AppFormInput
                    propertyInfo={schema as PropertyDefinitionRef}
                    property={schema.title || ""}
                    input={"line"}
                    instanceRef={instance}
                    onChange={handleInputReceived}
                /></>}
            </AppList>

            {<AppList color={"tertiary"}>
                {!requiredOnly && optionalFields.length > 0 && <AppChip onClick={() => setShowOptional(x => !x)} color="medium">
                    Optional Fields
                </AppChip>}
                {useMemo(() => showOptional ? <OptionalFormFields /> : <></>, [showOptional])}
            </AppList>}

            <AppToolbar color="clear">
                <AppButtons slot="start">
                    {errors.slice(0, 1).map(error => <AppText color='danger'>
                        {error}
                    </AppText>)}
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
export default AppForm;