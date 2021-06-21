/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, Fragment, MutableRefObject, ReactFragment, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Validator, { PropertyDefinitionRef } from 'validator';
import {
    AppBackButton, AppButton, AppButtons,
    AppCard, AppChip, AppCol,
    AppContent,

    AppFormArrayInput, AppFormInput, AppFormSelect, AppItem, AppLabel,
    AppList,
    AppLoadingCard,
    AppModal, AppText,
    AppTitle, AppToolbar, AppUuidGenerator
} from '..';
import { prettyTitle, titleCase } from '../../util';
import AppFormSelectArray from '../AppFormSelectArray';
import AppFormToggle from '../AppFormToggle';
import AppUploader from '../serialization/AppUploader';
import AppFormDateTimePicker from './AppFormDateTimePicker';
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

export interface formComposerProps extends formProps {
    lazyLoadValidator: () => Promise<Validator<unknown>>
    definition?: string,
}
export interface formNodeProps extends formProps {
    validator: Validator<unknown>
}

export interface formProps {
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
    customComponentMap?: Record<string, React.FC<nestedFormProps>>,
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



const AppForm: React.FC<formNodeProps> = (props) => {
    const { validator, data, onSubmit, children, lockedFields, hiddenFields,
        description, title, requiredOnly, calculatedFields, showFields,
        customSubmit, autoSubmit, customComponentMap, inlineFields } = props
    const { schema } = validator;
    if (typeof schema.type === "undefined") {
        // eslint-disable-next-line no-throw-literal
        throw "Schema must have a type"
    }

    const instance = useRef<any>(schema.type === "object" ? { ...data } : schema.type === "array" ? [...data] : undefined)
    const [isValid, setIsValid] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);


    const [optionalFieldsCache, setOptionalFieldsCache] = useState<JSX.Element | null>(null)
    const [optionalStatus, setOptionalStatus] = useState<"show" | "loading" | "loaded" | "initialize" | "hidden">("initialize");
    const toggleOptionalFields = () => {
        switch (optionalStatus) {
            case "initialize":
            case "loaded":
                setOptionalStatus("show")
                break;
            case "hidden":
                setOptionalStatus("show")
                break;
            case "show":
                setOptionalStatus("hidden")
                break;

            default:
                break;
        }
    }
    useEffect(() => {
        if (optionalStatus === "initialize") {
            setTimeout(() => {
                if (!requiredOnly) {
                    setOptionalStatus("loading")
                } else {
                    setOptionalStatus("loaded")
                }
            }, 200)
        }
        if (optionalStatus !== "loading") {
            return
        }
        const optionalFieldsRendered = optionalFields.map((property) => {
            if (lockedFields && lockedFields.includes(property))
                return <LockedField key={property} property={property} value={instance.current[property]} />
            if (hiddenFields && hiddenFields.includes(property))
                return <Fragment key={property}></Fragment>
            return <FormElement key={property} onChange={handleInputReceived} validator={validator} instanceRef={instance} property={property} />
        })
        setOptionalFieldsCache(<>{optionalFieldsRendered}</>);
        setOptionalStatus("loaded");
    }, [optionalStatus]);


    const handleInputReceived: formFieldChangeEvent = useCallback((property: string, value: any) => {
        if (schema.type === "string" || schema.type === "array") {
            instance.current = value;
        } else if (schema.type === "object") {
            instance.current = { ...instance.current, [property]: value === "" ? undefined : value };
            const calculateProperties = calculatedFields && calculatedFields.map[property];
            if (calculateProperties) {
                const calculatedFieldValue = calculateProperties({ property, value });
                if (calculatedFieldValue.value) {
                    instance.current = { ...instance.current, [calculatedFieldValue.property]: calculatedFieldValue.value };
                }
            }
        }

        setIsValid(validator.validate(instance.current))
        const allErrors = validator.validate.errors || []
        const propertyErrors = allErrors.filter(error => error.schemaPath === "#/" + property).map(x => x.message || "");
        setErrors(allErrors.map(x => x.dataPath.split("/").join("") + " " + x.keyword + " " + x.message))
        if (allErrors.length === 0) {
            autoSubmit && onSubmit(instance.current);
        }
        if (propertyErrors.length === 0) {
            return ["valid", undefined]
        } else {
            return ["invalid", propertyErrors]
        }
    }, [autoSubmit, calculatedFields, onSubmit, schema.type, validator]);

    const ComposeNestedFormElement: React.FC<nestedFormProps> = ({ customComponentMap, propertyInfo, property, inline, instanceRef, onChange }) => {
        const { title } = propertyInfo;
        const [showNestedForm, setShowNestedFrom] = useState(false);
        const [nestedFormStatus, setNestedFormStatus] = useState<formFieldStatus>("empty");
        const formated_title = titleCase((property || title || '').split("_").join(" "));
        return inline ? <AppForm
            data={instanceRef.current[property]}
            validator={validator.makeReferenceValidator(propertyInfo)}
            requiredOnly={requiredOnly}
            autoSubmit={true}
            calculatedFields={calculatedFields}
            hiddenFields={hiddenFields}
            lockedFields={lockedFields}
            showFields={showFields}
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
                        customComponentMap={customComponentMap}
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
        const propertyFormat = propertyInfo.format ? propertyInfo.format : refPropertyInfo["format"];
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

        // Custom component by property name
        if (customComponentMap && customComponentMap[property]) {
            return customComponentMap[property]({ instanceRef, customComponentMap, onChange: handleInputReceived, property, propertyInfo, children })
        }
        // Custom component by property identifier
        if (customComponentMap && propertyInfo.$id && customComponentMap[propertyInfo.$id]) {
            return customComponentMap[propertyInfo.$id]({ instanceRef, customComponentMap, onChange: handleInputReceived, property, propertyInfo, children })
        }


        if ("enum" in propertyInfo) {
            if ((propertyInfo as any)["type"] === "array") {
                return <AppFormSelectArray
                    instanceRef={instanceRef}
                    propertyInfo={propertyInfo}
                    property={property}
                    onChange={handleInputReceived}
                    key={property}
                />
            } else {
                return <AppFormSelect
                    instanceRef={instanceRef}
                    propertyInfo={propertyInfo}
                    property={property}
                    onChange={handleInputReceived}
                    key={property}
                />
            }
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
        if (propertyType === "string" && propertyFormat && propertyFormat.includes("date")) {
            return <AppFormDateTimePicker
                format={propertyFormat}
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
                hiddenFields={hiddenFields}
                lockedFields={lockedFields}
                showFields={showFields}
                property={property}
                customComponentMap={customComponentMap}
                validator={validator.makeReferenceValidator(propertyInfo)}
                key={property}
            />
        }

        if (propertyType === "object" && !propertyInfo.properties && (propertyInfo as any).additionalProperties && (propertyInfo as any).additionalProperties.allOf) {
            return <AppFormDictionaryInput
                onChange={handleInputReceived}
                instanceRef={instanceRef}
                customComponentMap={customComponentMap}
                propertyInfo={propertyInfo}
                hiddenFields={hiddenFields}
                lockedFields={lockedFields}
                showFields={showFields}
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
                customComponentMap={customComponentMap}
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
    requiredFields = showFields ? [...requiredFields, ...showFields.filter(x => schemaProperties.includes(x))] : requiredFields;
    const RequiredFormFields = () => <>{
        requiredFields.map(property => {
            if (lockedFields && lockedFields.includes(property))
                return <LockedField key={property} property={property} value={instance.current[property]} />
            if (hiddenFields && hiddenFields.includes(property))
                return <Fragment key={property}></Fragment>
            return <FormElement
                key={property}
                onChange={handleInputReceived}
                validator={validator}
                instanceRef={instance}
                property={property} />
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
                    input={"text"}
                    instanceRef={instance}
                    onChange={handleInputReceived}
                /></>}
            </AppList>

            {<AppList color={"clear"}>
                <AppItem color="clear">
                    {!requiredOnly && optionalFields.length > 0 && <AppButton color={optionalStatus === "hidden" ? "tertiary" : "primary"} fill={"outline"} onClick={toggleOptionalFields} >
                        {optionalStatus === "hidden" ? "Enter" : ""} Optional info
                    </AppButton>}
                </AppItem>
                {<div hidden={optionalStatus !== "show"}><Suspense fallback={<AppLoadingCard title="Rendering" color="primary" message="" />}>{optionalFieldsCache}</Suspense></div>}
            </AppList>}

            <AppToolbar color="clear">
                {errors.slice(0, 1).map(error => <AppChip key={"error"} color='danger'>
                    {title} {error.split('_').join(' ')}
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