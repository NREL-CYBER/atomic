/* eslint-disable no-script-url */
/* eslint-disable react-hooks/exhaustive-deps */
import { chevronDownOutline, chevronForwardOutline, pencilOutline } from 'ionicons/icons';
import React, { FC, Fragment, MutableRefObject, ReactFragment, Suspense, useMemo, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { PropertyDefinitionRef, RootSchemaObject, SchemaObjectDefinition } from 'validator';
import {
    AppBackButton, AppButton, AppButtons,
    AppCard, AppChip, AppCol, AppFormArrayInput, AppFormInput, AppFormSelect, AppIcon, AppItem, AppLabel,
    AppList, AppLoadingCard, AppModal, AppText,
    AppTitle, AppToolbar, AppUuidGenerator
} from '..';
import { prettyTitle, titleCase } from '../../util';
import AppFormAnyOfArrayInput from '../AppFormAnyOfArrayInput';
import { inputStatusColorMap } from '../AppFormInput';
import AppFormSelectArray from '../AppFormSelectArray';
import AppFormToggle from '../AppFormToggle';
import { VisualizeValue } from '../AppJsonDisplay';
import AppUploader from '../serialization/AppUploader';
import { validationCacheWorker } from "./../../workers/validationCacheWorker";
import AppFormDateTimePicker from './AppFormDateTimePicker';
import AppFormDictionaryInput from './AppFormDictionaryInput';
import AppFormInteger from './AppFormInteger';
import { AppFormLabel } from './AppFormLabel';
import AppFormNumber, { AppFormNumberRange } from './AppFormNumber';
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
    hideTitle?: boolean,
    rootSchema: RootSchemaObject
    objectSchema?: SchemaObjectDefinition
    onSubmit: (validData: any) => void,
    children?: ReactFragment,
    lockedFields?: string[]
    dependencyMap?: Record<string, string[]>
    hiddenFields?: string[]
    inlineFields?: string[]
    calculatedFields?: calculatedPropertyMap
    description?: string
    title?: string
    requiredOnly?: boolean
    showFields?: string[]
    autoSubmit?: boolean
    customSubmit?: ReactFragment
    customInputMap?: Record<string, React.FC<nestedFormProps>>
    customRenderMap?: Record<string, React.FC<{ value: any }>>,
    context?: any
}

export type formFieldValidationStatus = [formFieldStatus, string[] | undefined]
export type formFieldChangeEvent = (property: string, value: any) => Promise<formFieldValidationStatus>;

export interface formElementProps {
    required?: boolean
    property: string
    propertyInfo: PropertyDefinitionRef
    instanceRef: MutableRefObject<any>
    rootSchema: RootSchemaObject
    objectSchema: SchemaObjectDefinition
    onChange: formFieldChangeEvent
    context?: any
}
export interface nestedFormProps {
    required?: boolean,
    inline?: boolean,
    property: string
    propertyInfo: PropertyDefinitionRef
    instanceRef: MutableRefObject<any>
    objectSchema: SchemaObjectDefinition,
    rootSchema: RootSchemaObject,
    onChange: formFieldChangeEvent,
    showFields?: string[],
    hiddenFields?: string[],
    lockedFields?: string[],
    dependencyMap?: Record<string, string[]>,
    customRenderMap?: Record<string, React.FC<{ value: any }>>,
    customInputMap?: Record<string, React.FC<nestedFormProps>>
    context?: any
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
        description, title, requiredOnly, calculatedFields, showFields, dependencyMap,
        customSubmit, autoSubmit, customInputMap, customRenderMap, inlineFields, hideTitle, context } = props
    let objectSchema = props.objectSchema || props.rootSchema;
    const [deferedValidationPromises, setDefferedValidationResultPromises] = useState<Record<string, (status: formFieldValidationStatus) => void>>({})
    if (typeof objectSchema.type === "undefined") {
        objectSchema = findSubSchema(rootSchema, objectSchema, { ...objectSchema } as any)
        if (typeof objectSchema.type === "undefined") {
            // eslint-disable-next-line no-throw-literal
            throw "Schema must have a type"
        }
    }
    const [schemaProperties] = useState<string[]>(Object.keys({ ...objectSchema.properties }));
    const [reRenderDependents, setReRenderDependents] = useState<number>(0);
    const requiredProperties = objectSchema.required || [];
    const dependentFields = (Object.values({ ...objectSchema.dependentRequired, ...dependencyMap }).flatMap(x => x) as string[]).filter((y => schemaProperties.includes(y)));
    const triggeringFields = Object.keys({ ...objectSchema.dependentRequired, ...dependencyMap });
    const optionalFields = ((!requiredOnly ? schemaProperties.filter(x => !requiredProperties.includes(x)) : []).filter(o => showFields ? !showFields.includes(o) : true)).filter(x => !dependentFields.includes(x));
    let requiredFields = objectSchema.required ? schemaProperties.filter(x => requiredProperties.includes(x)) : []
    requiredFields = (showFields ? [...requiredFields, ...showFields.filter(x => schemaProperties.includes(x))] : requiredFields).filter(x => !dependentFields.includes(x));

    const instance = useRef<any>(objectSchema.type === "object" ? { ...data ? data : {} } : objectSchema.type === "array" ? [...Array.isArray(data) ? data : []] : undefined)
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

        const parsedErrors = allErrors.map((x: any) => "" + ((x.instancePath.split("/").join("")).length > 0 ? "'" + x.instancePath.split("/").join("") + "'" : "'" + x.params?.missingProperty + "'") + " " + x.keyword + " " + x.message);
        const propertyErrors = parsedErrors.filter((x: string) => x.includes("'" + property + "'"))
        const otherErrors = parsedErrors.filter((x: string) => !x.includes("'" + property + "'"))
        setErrors(otherErrors);
        if (allErrors.length === 0) {
            autoSubmit && onSubmit(instance.current);
        }

        if (propertyErrors.length === 0) {
            resolve && resolve(["valid", undefined])
        } else {
            resolve && resolve(["invalid", propertyErrors])
        }

    }

    const handleInputReceived: formFieldChangeEvent = (property: string, value: any) => {
        return new Promise<formFieldValidationStatus>(async (resolve) => {
            if (objectSchema.type === "string" || objectSchema.type === "array" || objectSchema.type === "number") {
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
            if (triggeringFields.includes(property)) {
                setReRenderDependents(x => x + 1)
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
    const ComposeNestedFormElement: React.FC<nestedFormProps> = ({ required, customInputMap, propertyInfo, property, inline, instanceRef, onChange, context }) => {
        const { title } = propertyInfo;
        const [showNestedForm, setShowNestedFrom] = useState(false);
        const [nestedFormStatus, setNestedFormStatus] = useState<formFieldStatus>(typeof instanceRef.current[property] === "undefined" ? "empty" : "valid");
        const nestedFormColor = inputStatusColorMap[nestedFormStatus];
        const [NestedFormVisual, setVisual] = useState(VisualizeValue({ customRenderMap, value: { ...instanceRef.current[property] }, propertyInfo }))
        const formated_title = titleCase((property || title || '').split("_").join(" "));
        return inline ? <AppForm
            customRenderMap={customRenderMap}
            data={instanceRef.current[property]}
            rootSchema={rootSchema}
            objectSchema={findSubSchema(rootSchema, objectSchema, propertyInfo)}
            requiredOnly={requiredOnly}
            autoSubmit={true}
            dependencyMap={dependencyMap}
            calculatedFields={calculatedFields}
            hiddenFields={hiddenFields}
            lockedFields={lockedFields}
            showFields={showFields}
            customInputMap={customInputMap as any}
            context={context}
            onSubmit={(nestedObjectValue) => {
                setVisual(VisualizeValue({ customRenderMap, value: nestedObjectValue, propertyInfo }));
                onChange(property, nestedObjectValue).then(([validationStatus, errors]) => {
                    setNestedFormStatus(validationStatus);
                    setShowNestedFrom(false);
                });
            }}
        >
        </AppForm> : <>
            <AppItem onClick={() => setShowNestedFrom(x => !x)}>
                <AppFormLabel name={formated_title} required={required} color={nestedFormColor} />
                {typeof NestedFormVisual !== "string" && NestedFormVisual}
                <AppButtons slot="end">
                    <AppButton fill="clear" color="primary">
                        < AppIcon icon={pencilOutline} />
                    </AppButton>
                </AppButtons>
            </AppItem >
            <Suspense fallback={<></>}>
                <AppModal onDismiss={() => setShowNestedFrom(false)} isOpen={showNestedForm}>
                    {showNestedForm && <AppForm
                        data={instanceRef.current[property]}
                        customInputMap={customInputMap as any}
                        rootSchema={rootSchema}
                        context={context}
                        dependencyMap={dependencyMap}
                        objectSchema={findSubSchema(rootSchema, objectSchema, propertyInfo)}
                        onSubmit={(nestedObjectValue) => {
                            setNestedFormStatus("valid");
                            setVisual(<VisualizeValue customRenderMap={customRenderMap} value={nestedObjectValue} propertyInfo={propertyInfo} />)
                            onChange(property, nestedObjectValue);
                            setShowNestedFrom(false);
                        }}
                    ><AppBackButton onClick={() => setShowNestedFrom(false)} />
                    </AppForm>}
                </AppModal>
            </Suspense>

        </>
    }


    const FormElement: React.FC<formElementProps> = ({ required, instanceRef, property, rootSchema, objectSchema, propertyInfo, context }) => {

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
            return <AppUploader
                required={required}
                accept={(propertyInfo as any)["contentMediaType"]}
                description={propertyInfo.description || ""} title={propertyInfo.title || property}
                onFileReceived={(meta, uri) => {
                    handleInputReceived(property, uri);
                }} />
        }

        // Custom component by property name
        if (customInputMap && customInputMap[property]) {
            return customInputMap[property]({ instanceRef, customInputMap, onChange: handleInputReceived, context, property, propertyInfo, children, objectSchema, rootSchema })
        }
        // Custom component by property identifier
        if (customInputMap && propertyInfo.$id && customInputMap[propertyInfo.$id]) {
            return customInputMap[propertyInfo.$id]({ instanceRef, customInputMap, onChange: handleInputReceived, context, property, propertyInfo, children, objectSchema, rootSchema })
        }


        if ("enum" in propertyInfo) {
            if ((propertyInfo as any)["type"] === "array") {
                return <AppFormSelectArray
                    context={context}
                    rootSchema={rootSchema}
                    objectSchema={objectSchema}
                    required={required}
                    instanceRef={instanceRef}
                    propertyInfo={propertyInfo as any}
                    property={property}
                    onChange={handleInputReceived}
                    key={property}
                />
            } else {
                return <AppFormSelect
                    context={context}
                    required={required}
                    instanceRef={instanceRef}
                    propertyInfo={propertyInfo as any}
                    property={property}
                    onChange={handleInputReceived}
                    key={property}
                />
            }
        }
        if (propertyType === "boolean") {
            return <AppFormToggle
                rootSchema={rootSchema}
                objectSchema={objectSchema}
                required={required}
                instanceRef={instanceRef}
                propertyInfo={refPropertyInfo}
                property={property}
                onChange={handleInputReceived}
                key={property}
            />
        }
        if (propertyType === "string" && propertyFormat && propertyFormat.includes("date")) {
            return <AppFormDateTimePicker
                required={required}
                rootSchema={rootSchema}
                objectSchema={objectSchema}
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
                required={required}
                instanceRef={instanceRef}
                propertyInfo={refPropertyInfo}
                property={property}
                onChange={handleInputReceived}
                key={property}
            />
        }
        if (propertyType === "number") {
            return (propertyType as any).minimum && (propertyType as any).maximum ? <AppFormNumberRange
                rootSchema={rootSchema}
                objectSchema={objectSchema}
                required={required}
                instanceRef={instanceRef}
                propertyInfo={refPropertyInfo}
                property={property}
                onChange={handleInputReceived}
                key={property}
            /> : <AppFormNumber
                rootSchema={rootSchema}
                objectSchema={objectSchema}
                required={required}
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
                required={required}
                objectSchema={findSubSchema(rootSchema, objectSchema, propertyInfo)}
                onChange={handleInputReceived}
                dependencyMap={dependencyMap}
                instanceRef={instanceRef}
                propertyInfo={propertyInfo}
                hiddenFields={hiddenFields}
                lockedFields={lockedFields}
                showFields={showFields}
                context={context}
                property={property}
                customInputMap={customInputMap}
                key={property}
            /> : <AppFormAnyOfArrayInput
                required={required}
                context={context}
                rootSchema={rootSchema}
                objectSchema={findSubSchema(rootSchema, objectSchema, propertyInfo)}
                onChange={handleInputReceived}
                instanceRef={instanceRef}
                propertyInfo={propertyInfo}
                hiddenFields={hiddenFields}
                lockedFields={lockedFields}
                showFields={showFields}
                property={property}
                customInputMap={customInputMap as any}
                key={property}
            />
        }

        if (propertyType === "object" && !propertyInfo.properties && (propertyInfo as any).additionalProperties && (propertyInfo as any).additionalProperties.allOf) {
            return <AppFormDictionaryInput
                required={required}
                onChange={handleInputReceived}
                instanceRef={instanceRef}
                context={context}
                customInputMap={customInputMap}
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
                objectSchema={objectSchema}
                rootSchema={rootSchema}
                required={required}
                input={"text"}
                propertyInfo={propertyInfo}
                context={context}
                instanceRef={instanceRef}
                property={property}
                onChange={handleInputReceived}
                key={property}
            />

        }

        if (propertyType === "object") {
            return < ComposeNestedFormElement
                objectSchema={objectSchema}
                rootSchema={rootSchema}
                context={context}
                required={required}
                inline={inlineFields && inlineFields.includes(property)}
                onChange={handleInputReceived}
                customInputMap={customInputMap}
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
                propertyInfo={objectSchema.properties && objectSchema.properties[property]}
                required={showFields ? !showFields?.includes(property) : true}
                context={context}
                rootSchema={rootSchema}
                objectSchema={objectSchema}
                key={property}
                onChange={handleInputReceived}
                instanceRef={instance}
                property={property} />
        })}</>
    const DependentFormFields = () => {
        return <>{
            dependentFields.map(property => {
                if (lockedFields && lockedFields.includes(property))
                    return <LockedField key={property} property={property} value={instance.current[property]} />
                if (hiddenFields && hiddenFields.includes(property))
                    return <Fragment key={property}></Fragment>
                return <FormElement
                    propertyInfo={objectSchema.properties && objectSchema.properties[property]}
                    required={true}
                    context={context}
                    rootSchema={rootSchema}
                    objectSchema={objectSchema}
                    key={property}
                    onChange={handleInputReceived}
                    instanceRef={instance}
                    property={property} />
            })}</>
    }




    return <>
        <Suspense fallback={<AppLoadingCard />}>
            <AppCard contentColor={"light"} title={!hideTitle ? <>
                <AppToolbar color="clear">
                    <AppButtons slot="start">
                        {children}
                        {<AppTitle color={isValid ? "favorite" : "tertiary"}>
                            {prettyTitle(title || objectSchema.title)}
                        </AppTitle>}
                    </AppButtons>
                </AppToolbar>
            </> : <></>}>
                <AppItem>
                    <AppText color="medium">
                        {description ? description : objectSchema.description}
                    </AppText>
                </AppItem>
                <Suspense fallback={<AppLoadingCard />}>
                    <AppList color="clear">
                        {useMemo(() => <RequiredFormFields />, [])}
                        {useMemo(() => <DependentFormFields />, [reRenderDependents])}
                        {objectSchema.type === "string" ? typeof (objectSchema as any)['enum'] === "undefined" ? <>
                            <AppFormInput
                                rootSchema={rootSchema}
                                objectSchema={objectSchema}
                                context={context}
                                propertyInfo={objectSchema as PropertyDefinitionRef}
                                property={objectSchema.title || ""}
                                input={"text"}
                                instanceRef={instance}
                                onChange={handleInputReceived}
                            />
                        </> : <AppFormSelect
                            propertyInfo={objectSchema as any}
                            required={true}
                            context={context}

                            property={objectSchema.title || ""}
                            instanceRef={instance}
                            onChange={handleInputReceived}
                        /> : <></>}
                        {objectSchema.type === "boolean" && <>
                            <AppFormToggle
                                context={context}

                                rootSchema={rootSchema}
                                objectSchema={objectSchema}
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
                    {!requiredOnly && optionalFields.length > 0 && <AppItem color="clear" onClick={toggleOptionalFields}>
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
                                            propertyInfo={objectSchema.properties![property]}
                                            required={false}
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
export default AppForm;

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


