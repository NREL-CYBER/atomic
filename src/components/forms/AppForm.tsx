/* eslint-disable no-script-url */
/* eslint-disable react-hooks/exhaustive-deps */
import { chevronDownOutline, chevronForwardOutline } from 'ionicons/icons';
import React, { FC, Fragment, MutableRefObject, ReactFragment, Suspense, useMemo, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { PropertyDefinitionRef, RootSchemaObject, SchemaObjectDefinition } from 'validator';
import {
    AppBackButton, AppButton, AppButtons,
    AppCard, AppChip, AppCol,
    AppContent,

    AppFormArrayInput, AppFormInput, AppFormSelect, AppIcon, AppItem, AppLabel,
    AppList, AppLoadingCard, AppModal, AppText,
    AppTitle, AppToolbar, AppUuidGenerator
} from '..';
import { prettyTitle, titleCase } from '../../util';
import AppFormAnyOfArrayInput from '../AppFormAnyOfArrayInput';
import AppFormSelectArray from '../AppFormSelectArray';
import AppFormToggle from '../AppFormToggle';
import AppUploader from '../serialization/AppUploader';
import { validationCacheWorker } from "./../../workers/validationCacheWorker";
import AppFormDateTimePicker from './AppFormDateTimePicker';
import AppFormDictionaryInput from './AppFormDictionaryInput';
import AppFormInteger from './AppFormInteger';
import AppFormNumber from './AppFormNumber';
import AppLastModifiedGenerator from './AppLastModifiedGenerator';

export interface propertyKeyValue {
    property: string,
    value: string
}
export interface calculatedPropertyMap {
    map: Record<string, (base: propertyKeyValue) => propertyKeyValue>
}

export interface formNodeProps extends formProps {
}

export interface formProps {
    data: any,
    rootSchema: RootSchemaObject
    objectSchema?: SchemaObjectDefinition
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
export type formFieldChangeEvent = (property: string, value: any) => Promise<formFieldValidationStatus>;

interface formElementProps {
    property: string
    instanceRef: MutableRefObject<any>
    rootSchema: RootSchemaObject
    objectSchema: SchemaObjectDefinition
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
export type formFieldStatus = "valid" | "invalid" | "unknown" | "empty";



const AppForm: React.FC<formNodeProps> = (props) => {
    const { rootSchema, data, onSubmit, children, lockedFields, hiddenFields,
        description, title, requiredOnly, calculatedFields, showFields,
        customSubmit, autoSubmit, customComponentMap, inlineFields } = props
    const objectSchema = props.objectSchema || props.rootSchema;
    const [deferedValidationPromises, setDefferedValidationResultPromises] = useState<Record<string, (status: formFieldValidationStatus) => void>>({})
    if (typeof objectSchema.type === "undefined") {
        // eslint-disable-next-line no-throw-literal
        throw "Schema must have a type"
    }
    const [schemaProperties] = useState<string[]>(Object.keys({ ...objectSchema.properties }));
    const requiredProperties = objectSchema.required || [];

    const optionalFields = (!requiredOnly ? schemaProperties.filter(x => !requiredProperties.includes(x)) : []).filter(o => showFields ? !showFields.includes(o) : true);
    let requiredFields = objectSchema.required ? schemaProperties.filter(x => requiredProperties.includes(x)) : []
    requiredFields = showFields ? [...requiredFields, ...showFields.filter(x => schemaProperties.includes(x))] : requiredFields;
    const instance = useRef<any>(objectSchema.type === "object" ? { ...data } : objectSchema.type === "array" ? [...data] : undefined)
    const [isValid, setIsValid] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);


    const [optionalStatus, setOptionalStatus] = useState<"show" | "hidden">(requiredFields.length === 0 ? "show" : "hidden");
    const toggleOptionalFields = () => {
        switch (optionalStatus) {
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
    validationCacheWorker.onmessage = ({ data }) => {
        const allErrors = data.errors || []
        const uuid = data.uuid
        const property = data.property
        const resolve = deferedValidationPromises[uuid]
        setIsValid(allErrors.length === 0)
        const parsedErrors = allErrors.map((x: any) => x.instancePath.split("/").join("") + " " + x.keyword + " " + x.message);
        const propertyErrors = parsedErrors.filter((x: string) => x.includes("'" + property + "'"))
        setErrors(parsedErrors)
        if (allErrors.length === 0) {
            autoSubmit && onSubmit(instance.current);
        }

        if (propertyErrors.length === 0) {
            resolve(["valid", undefined])
        } else {
            resolve(["invalid", propertyErrors])
        }

    }

    const handleInputReceived: formFieldChangeEvent = (property: string, value: any) => {
        return new Promise<formFieldValidationStatus>(async (resolve) => {
            if (objectSchema.type === "string" || objectSchema.type === "array") {
                instance.current = value;
            } else if (objectSchema.type === "object") {
                instance.current = { ...instance.current, [property]: value === "" ? undefined : value };
                const calculateProperties = calculatedFields && calculatedFields.map[property];
                if (calculateProperties) {
                    const calculatedFieldValue = calculateProperties({ property, value });
                    if (calculatedFieldValue.value) {
                        instance.current = { ...instance.current, [calculatedFieldValue.property]: calculatedFieldValue.value };
                    }
                }
            }
            const uuid = v4()
            setDefferedValidationResultPromises(x => ({ ...x, [uuid]: resolve }));
            validationCacheWorker.postMessage(
                {
                    rootSchema, objectSchema, property, value, instance, uuid
                }
            )
        })
    }
    const ComposeNestedFormElement: React.FC<nestedFormProps> = ({ customComponentMap, propertyInfo, property, inline, instanceRef, onChange }) => {
        const { title } = propertyInfo;
        const [showNestedForm, setShowNestedFrom] = useState(false);
        const [nestedFormStatus, setNestedFormStatus] = useState<formFieldStatus>("empty");
        const formated_title = titleCase((property || title || '').split("_").join(" "));
        return inline ? <AppFormComposer
            data={instanceRef.current[property]}
            rootSchema={rootSchema}
            objectSchema={findSubSchema(rootSchema, objectSchema, propertyInfo)}
            requiredOnly={requiredOnly}
            autoSubmit={true}
            calculatedFields={calculatedFields}
            hiddenFields={hiddenFields}
            lockedFields={lockedFields}
            showFields={showFields}
            customComponentMap={customComponentMap as any}
            onSubmit={(nestedObjectValue) => {
                onChange(property, nestedObjectValue).then(([validationStatus, errors]) => {
                    setNestedFormStatus(validationStatus);
                    setShowNestedFrom(false);
                });
            }}
        >
        </AppFormComposer> : <AppItem>
            <AppButtons slot="start">
                <AppButton color={nestedFormStatus === "valid" ? "success" : "primary"} fill="outline" onClick={() => setShowNestedFrom(x => !x)} >
                    {formated_title}
                </AppButton>
            </AppButtons>
            <Suspense fallback={<></>}>
                <AppModal onDismiss={() => setShowNestedFrom(false)} isOpen={showNestedForm}>
                    <AppContent>
                        {showNestedForm && <AppFormComposer
                            data={instanceRef.current[property]}
                            customComponentMap={customComponentMap as any}
                            rootSchema={rootSchema}
                            objectSchema={findSubSchema(rootSchema, objectSchema, propertyInfo)}
                            onSubmit={(nestedObjectValue) => {
                                setNestedFormStatus("valid");
                                onChange(property, nestedObjectValue);
                                setShowNestedFrom(false);
                            }}
                        ><AppBackButton onClick={() => setShowNestedFrom(false)} />
                        </AppFormComposer>}
                    </AppContent>
                </AppModal>
            </Suspense>
        </AppItem >
    }


    const FormElement: React.FC<formElementProps> = ({ instanceRef, property, rootSchema, objectSchema }) => {
        const propertyInfo = objectSchema.properties && objectSchema.properties[property];

        if (typeof propertyInfo === "undefined") {
            return <>Undefined property... is your JSON schema OK?</>;
        }
        const refPropertyInfo = findReferenceInformation(rootSchema, objectSchema, property, propertyInfo) as PropertyDefinitionRef;
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

        if (propertyType === "integer") {
            return <AppFormInteger
                instanceRef={instanceRef}
                propertyInfo={refPropertyInfo}
                property={property}
                onChange={handleInputReceived}
                key={property}
            />
        }
        if (propertyType === "number") {
            return <AppFormNumber
                instanceRef={instanceRef}
                propertyInfo={refPropertyInfo}
                property={property}
                onChange={handleInputReceived}
                key={property}
            />
        }


        if (propertyType === "array") {
            return typeof propertyInfo.items?.anyOf === "undefined" ? <AppFormArrayInput
                rootSchema={rootSchema}
                objectSchema={findSubSchema(rootSchema, objectSchema, propertyInfo)}
                onChange={handleInputReceived}
                instanceRef={instanceRef}
                propertyInfo={propertyInfo}
                hiddenFields={hiddenFields}
                lockedFields={lockedFields}
                showFields={showFields}
                property={property}
                customComponentMap={customComponentMap}
                key={property}
            /> : <AppFormAnyOfArrayInput
                rootSchema={rootSchema}
                objectSchema={findSubSchema(rootSchema, objectSchema, propertyInfo)}
                onChange={handleInputReceived}
                instanceRef={instanceRef}
                propertyInfo={propertyInfo}
                hiddenFields={hiddenFields}
                lockedFields={lockedFields}
                showFields={showFields}
                property={property}
                customComponentMap={customComponentMap}
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
                objectSchema={objectSchema}
                rootSchema={rootSchema}
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


    const RequiredFormFields = () => <>{
        requiredFields.map(property => {
            if (lockedFields && lockedFields.includes(property))
                return <LockedField key={property} property={property} value={instance.current[property]} />
            if (hiddenFields && hiddenFields.includes(property))
                return <Fragment key={property}></Fragment>
            return <FormElement
                rootSchema={rootSchema}
                objectSchema={objectSchema}
                key={property}
                onChange={handleInputReceived}
                instanceRef={instance}
                property={property} />
        })}</>



    return <>
        <Suspense fallback={<AppLoadingCard />}>
            <AppCard contentColor={"light"} title={<>
                <AppToolbar color="clear">
                    <AppButtons slot="start">
                        {children}
                        {<AppTitle color={isValid ? "favorite" : "tertiary"}>
                            {prettyTitle(title || objectSchema.title)}
                        </AppTitle>}
                    </AppButtons>
                </AppToolbar>
            </>}>
                <AppItem>
                    <AppText color="medium">
                        {description ? description : objectSchema.description}
                    </AppText>
                </AppItem>
                <Suspense fallback={<AppLoadingCard />}>
                    <AppList color="clear">
                        {useMemo(() => <RequiredFormFields />, [])}
                        {objectSchema.type === "string" && <>
                            <AppFormInput
                                propertyInfo={objectSchema as PropertyDefinitionRef}
                                property={objectSchema.title || ""}
                                input={"text"}
                                instanceRef={instance}
                                onChange={handleInputReceived}
                            />
                        </>}
                        {objectSchema.type === "boolean" && <>
                            <AppFormToggle
                                propertyInfo={objectSchema as PropertyDefinitionRef}
                                property={objectSchema.title || ""}
                                instanceRef={instance}
                                onChange={handleInputReceived}
                            />
                        </>}
                        {objectSchema.type === "number" && <>
                            <AppFormInteger
                                propertyInfo={objectSchema as PropertyDefinitionRef}
                                property={objectSchema.title || ""}
                                instanceRef={instance}
                                onChange={handleInputReceived}
                            />
                        </>}

                    </AppList>
                </Suspense>

                {<AppList color={"clear"}>
                    {!requiredOnly && optionalFields.length > 0 && <AppItem href={'javascript:void(0)'} color="clear" onClick={toggleOptionalFields}>
                        {<AppIcon icon={optionalStatus === 'show' ? chevronDownOutline : chevronForwardOutline} />}

                        <AppTitle color='medium'>
                            {optionalStatus === "hidden" ? "Enter" : ""} Optional info
                        </AppTitle>
                    </AppItem>}
                    {<div hidden={optionalStatus !== "show"}>
                        <Suspense fallback={<></>}>
                            {useMemo(
                                () =>
                                    optionalFields.map((property) => {
                                        if (lockedFields && lockedFields.includes(property))
                                            return <LockedField key={property} property={property} value={instance.current[property]} />
                                        if (hiddenFields && hiddenFields.includes(property))
                                            return <Fragment key={property}></Fragment>
                                        return <FormElement
                                            rootSchema={rootSchema}
                                            objectSchema={objectSchema}
                                            key={property}
                                            onChange={handleInputReceived}
                                            instanceRef={instance} property={property} />
                                    })
                                , [])}
                        </Suspense>
                    </div>}
                </AppList>}

                <AppToolbar color="clear">
                    {useMemo(() => errors.slice(0, 1).map(error => <AppChip key={"error"} color='danger'>
                        {title} {error.split('_').join(' ')}
                    </AppChip>), [errors])}

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
        </Suspense>
    </>
};
const AppFormComposer = AppForm;
export default AppForm;
export { AppFormComposer };

export function findSubSchema(schema: RootSchemaObject, objectSchema: SchemaObjectDefinition, propertyInfo: PropertyDefinitionRef): SchemaObjectDefinition {
    const definitions = Object.values(schema.definitions || {})
    const definition_id = propertyInfo.$ref || propertyInfo.items?.$ref
    const matchingDefinition = definition_id && definitions.find(x => x.$id === definition_id);
    if (matchingDefinition) {
        return matchingDefinition;
    }
    if (propertyInfo.items && typeof propertyInfo.$ref === 'undefined') {
        return propertyInfo.items as SchemaObjectDefinition;
    }
    return propertyInfo as SchemaObjectDefinition
}
export function findSchemaDefinitionId(schema: RootSchemaObject, propertyInfo: PropertyDefinitionRef): string {
    if (propertyInfo.$ref) {
        return propertyInfo.$ref
    }
    if (propertyInfo.items) {
        return propertyInfo.items.$ref as string
    }
    return propertyInfo.$id!
}
export function findSchemaDefinition(schema: RootSchemaObject, definition: string): SchemaObjectDefinition {
    return schema!.definitions![definition];
}

export function findReferenceInformation(rootSchema: RootSchemaObject, objectSchema: SchemaObjectDefinition, property: string, propInfo: PropertyDefinitionRef): PropertyDefinitionRef {
    if (typeof propInfo.$id === 'undefined' && typeof propInfo.$ref === 'undefined' && typeof propInfo.allOf === 'undefined' && typeof propInfo.anyOf === 'undefined') {
        return propInfo;
    }
    if (propInfo.items) {
        if (propInfo.items!.$ref) {
            return findSubSchema(rootSchema, objectSchema, propInfo) as PropertyDefinitionRef
        }
        return propInfo
    }
    if (propInfo.$ref) {
        return findSubSchema(rootSchema, objectSchema, propInfo) as PropertyDefinitionRef
    }
    return propInfo
}


