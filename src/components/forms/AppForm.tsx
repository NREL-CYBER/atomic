/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, Fragment, MutableRefObject, ReactFragment, useCallback, useMemo, useRef, useState } from 'react';
import Validator, { PropertyDefinitionRef } from 'validator';
import {
    AppBackButton, AppButton, AppButtons,
    AppCard, AppChip, AppCol,
    AppContent,

    AppFormArrayInput, AppFormInput, AppFormSelect,
    AppItem, AppLabel,
    AppList,
    AppModal,
    AppText,
    AppTitle, AppToolbar, AppUuidGenerator
} from '..';
import { prettyTitle, titleCase } from '../../util';
import AppFormToggle from '../AppFormToggle';
import AppUploader from '../serialization/AppUploader';
import AppFormDictionaryInput from './AppFormDictionaryInput';
import AppFormInteger from './AppFormInteger';
import AppLastModifiedGenerator from './AppLastModifiedGenerator';

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
    inlineFields?: string[]
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

export interface nestedFormProps {
    property: string
    inline?: boolean
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
        customSubmit, autoSubmit, customComponentMap, inlineFields } = props
    const { schema } = validator;
    console.log(schema.properties);
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
        console.log(allErrors);
        const propertyErrors = allErrors.filter(error => error.dataPath.includes(property) || (error.message || "")
            .includes(property)).map(x => x.message || "");
        setErrors(allErrors.map(x => x.dataPath.split("#").join("") + " " + x.message || ""))
        if (allErrors.length === 0) {
            autoSubmit && onSubmit(instance.current);
        }
        if (propertyErrors.length === 0) {
            return ["valid", undefined]
        } else {
            return ["invalid", propertyErrors]
        }
    }, [autoSubmit, calculatedFields, onSubmit, schema.type, validator]);

    const ComposeNestedFormElement: React.FC<nestedFormProps> = ({ propertyInfo, property, inline, instanceRef, onChange }) => {
        const { title } = propertyInfo;
        const [showNestedForm, setShowNestedFrom] = useState(false);
        const [nestedFormStatus, setNestedFormStatus] = useState<formFieldStatus>("empty");
        const formated_title = titleCase((property || title || '').split("_").join(" "));
        return inline ? <AppForm
            data={instanceRef.current[property]}
            validator={validator.makeReferenceValidator(propertyInfo)}
            requiredOnly={requiredOnly}
            autoSubmit={true}
            customComponentMap={customComponentMap}
            onSubmit={(nestedObjectValue) => {
                setNestedFormStatus("valid");
                onChange(property, nestedObjectValue);
                setShowNestedFrom(false);
            }}
        >
        </AppForm> : <AppItem>
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
        if (property === "uuid") {
            return <AppUuidGenerator
                instanceRef={instanceRef} />
        }
        if (property === "last_modified") {
            return <AppLastModifiedGenerator
                instanceRef={instanceRef} />
        }
        if ((propertyInfo as any)["contentMediaType"]) {
            return <AppUploader accept={(propertyInfo as any)["contentMediaType"]}
                description={propertyInfo.description || ""} title={propertyInfo.title || property}
                onFileReceived={(meta, uri) => {
                    handleInputReceived(property, uri);
                }} />
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
        if (propertyType === "integer" || propertyType === "number") {
            return <AppFormInteger
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

        if (propertyType === "object" && !propertyInfo.properties && (propertyInfo as any).additionalProperties && (propertyInfo as any).additionalProperties.allOf) {
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
            return < ComposeNestedFormElement
                inline={inlineFields && inlineFields.includes(property)}
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

    const optionalFields = (!requiredOnly ? schemaProperties.filter(x => !requiredProperties.includes(x)) : []).filter(o => showFields ? !showFields.includes(o) : true);
    let requiredFields = schema.required ? schemaProperties.filter(x => requiredProperties.includes(x)) : []
    requiredFields = showFields ? [...requiredFields, ...showFields] : requiredFields;
    const [showOptional, setShowOptional] = useState<boolean>(false);
    const RequiredFormFields = () => <>{
        requiredFields.map(property => {
            if (lockedFields && lockedFields.includes(property))
                return <LockedField key={property} property={property} value={instance.current[property]} />
            if (hiddenFields && hiddenFields.includes(property))
                return <Fragment key={property}>{property}t</Fragment>
            return <FormElement key={property} onChange={handleInputReceived} validator={validator} instanceRef={instance} property={property} />
        })}</>


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const OptionalFormFields = () => <>{
        optionalFields.map((property) => {
            if (lockedFields && lockedFields.includes(property))
                return <LockedField key={property} property={property} value={instance.current[property]} />
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
                        {prettyTitle(title || schema.title)}
                    </AppTitle>}
                </AppButtons>
            </AppToolbar>
        </>}>
            <AppItem>
                <AppText color="medium">
                    {description ? description : schema.description}
                </AppText>
            </AppItem>
            <AppList color="clear">
                {useMemo(() => <RequiredFormFields />, [])}
                {schema.type === "string" && <><AppFormInput
                    propertyInfo={schema as PropertyDefinitionRef}
                    property={schema.title || ""}
                    input={"line"}
                    instanceRef={instance}
                    onChange={handleInputReceived}
                /></>}
            </AppList>

            {<AppList color={"clear"}>
                <AppItem color="clear">
                    {!requiredOnly && optionalFields.length > 0 && <AppButton color={showOptional ? "tertiary" : "primary"} fill={"outline"} onClick={() => setShowOptional(x => !x)} >
                        {!showOptional ? "Enter" : ""} Optional info
                    </AppButton>}
                </AppItem>
                {useMemo(() => showOptional ? <OptionalFormFields /> : <></>, [showOptional])}
            </AppList>}

            <AppToolbar color="clear">
                {errors.slice(0, 1).map(error => <AppChip key={"error"} color='danger'>
                    {title} {error.split('_').join('-')}
                </AppChip>)}

                {useMemo(() => !autoSubmit && isValid ? <AppButton expand="full" fill={"solid"} color={isValid ? "favorite" : "primary"} onClick={() => {
                    onSubmit(instance.current);
                }}>
                    {!customSubmit ? <>
                        <AppTitle>
                            Save {title}
                        </AppTitle>
                    </> : customSubmit}
                </AppButton> : <></>, [autoSubmit, customSubmit, isValid, onSubmit])}
            </AppToolbar>

        </AppCard >
    </>
};
export default AppForm;