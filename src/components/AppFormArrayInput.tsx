/* eslint-disable no-script-url */
import { AppLabel } from "atomic";
import produce from "immer";
import { addSharp, removeOutline, returnDownForwardOutline } from 'ionicons/icons';
import { isArray, values } from "lodash";
import React, { MutableRefObject, useCallback, useState } from 'react';
import { PropertyDefinitionRef, RootSchemaObject, SchemaObjectDefinition } from "validator";
import { AppBackButton, AppButton, AppButtons, AppChip, AppForm, AppIcon, AppItem, AppModal } from '.';
import { isUndefined, removeAtIndex } from '../util';
import prettyTitle from '../util/prettyTitle';
import { uniqueObjects } from "../util/unique";
import AppCard from "./AppCard";
import { InputStatus, inputStatusColorMap } from "./AppFormInput";
import { findSubSchema, formFieldChangeEvent, nestedFormProps } from './forms/AppForm';
import { AppFormErrorsItem } from "./forms/AppFormErrorsItem";
import { AppFormLabel } from "./forms/AppFormLabel";


interface formInputProps {
    required?: boolean
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
    customTitleFunction?: (value: any) => string,
    customComponentMap?: Record<string, React.FC<nestedFormProps>>
    context?: any
}



export const findShortestValue = (val: any) => {
    /**This looks like vooodooo, but it is just displaying the value 
                     * that is the shortest, which is usually the title || name */
    const standard_values = ["name", "title", "id"]
    const keys = Object.keys(val);
    const standard_keys = keys.filter((k) => standard_values.includes(k))
    if (standard_keys.length > 0) {
        return val[standard_keys[0]];
    }
    if (isArray(val['values'])) {
        return val['values'].map(x => String(x)).join(' ')
    }
    return String(
        Object
            .values(val as Object)
            .sort((a, b) => String(a).length - String(b).length)
            .filter(x => x.length > 0)[0])
}

/**
 * Component for input that displays validation errors
 */
const AppFormArrayInput = (props: formInputProps) => {
    const { property, instanceRef, onChange, customTitleFunction,
        propertyInfo, customComponentMap, hiddenFields, lockedFields, showFields, required,
        objectSchema, rootSchema } = props;
    const existing_data: any[] = instanceRef.current[property] ? instanceRef.current[property] : [];
    const [errors, setErrors] = useState<string[] | undefined>(undefined);
    const [inputStatus, setInputStatus] = useState<InputStatus>(existing_data.length > 0 ? "valid" : "empty");
    const [isInsertingItem, setIsInsertingItem] = useState<boolean>(false);
    const [value, setValue] = useState<any[]>(existing_data)
    const [editingItemIndex, setEditingItemIndex] = useState<number | undefined>()
    const propertyFormattedName = prettyTitle(propertyInfo.title || property);
    const inputStatusColor = inputStatusColorMap[inputStatus];
    const beginInsertItem = (val: any = {}) => {
        if (isUndefined(value)) {
            setValue([])
        };
        setIsInsertingItem(true)
    };
    const editItem = (index: number) => {
        setEditingItemIndex(index);
        beginInsertItem();
    }

    const onSubmitItem = useCallback(async (item: any) => {
        const newValue = uniqueObjects(produce(value, (draftValue) => {
            if (typeof editingItemIndex !== "undefined") {
                draftValue[editingItemIndex] = item
            } else {
                draftValue.push(item);
            }
        }));

        const validationResult = onChange(property, newValue)
        validationResult.then(([validationStatus, errors]) => {
            setIsInsertingItem(false);
            setValue(newValue);
            setInputStatus(validationStatus);
            setErrors(errors);
            setEditingItemIndex(undefined);
        })
        return validationResult;
    }, [editingItemIndex, onChange, property, value])

    const onBackPressed = useCallback(() => {
        setIsInsertingItem(false);
    }, [])
    const itemId = propertyInfo.items?.$ref?.toString() || ""
    const customItemComponent = customComponentMap && customComponentMap[itemId]
    const subSchema = findSubSchema(rootSchema, objectSchema, propertyInfo);
    const elementTitle = propertyFormattedName + "[" + (typeof editingItemIndex === "number" ? editingItemIndex : values.length) + "]";
    return <>
        <AppItem onClick={(e) => {
            beginInsertItem()
        }}>
            <AppButtons slot='start'>
                <AppLabel color={inputStatusColor}>[{value.length}]</AppLabel>
            </AppButtons>
            {value.length === 0 && <AppButtons slot="end">
                <AppButton fill="clear" color='primary' className={"close-button"}>
                    <AppIcon icon={addSharp} />
                </AppButton>
            </AppButtons>}

            <AppFormLabel required={required} onClick={() => {
                beginInsertItem()
            }} name={propertyFormattedName + " "} color={inputStatusColor} />
        </AppItem>
        <div hidden={!isInsertingItem}>
            {<AppModal isOpen={isInsertingItem} onDismiss={() =>
                onBackPressed()
            }>
                {customItemComponent ? <AppCard title={elementTitle}>{customItemComponent({
                    showFields,
                    hiddenFields,
                    lockedFields,
                    customComponentMap,
                    rootSchema,
                    objectSchema: subSchema,
                    onChange: (_, value) => {
                        return onSubmitItem(value);
                    },
                    instanceRef: {
                        current: {
                            item: value && typeof editingItemIndex !== 'undefined' ?
                                value[editingItemIndex] ?
                                    subSchema.type === "object" ?
                                        {} : subSchema.type === "array" ?
                                            [] : undefined : undefined : undefined
                        }
                    },
                    property: "item",
                    propertyInfo,
                    context: value
                })}
                </AppCard> : <AppForm
                    title={elementTitle}
                    showFields={showFields}
                    hiddenFields={hiddenFields}
                    lockedFields={lockedFields}
                    customComponentMap={customComponentMap}
                    rootSchema={rootSchema}
                    objectSchema={subSchema}
                    data={typeof editingItemIndex !== "undefined" ? value[editingItemIndex] : {}}
                    context={value}
                    onSubmit={onSubmitItem} >
                    <AppBackButton onClick={() => onBackPressed()} />
                </AppForm>}
            </AppModal>}
        </div>
        {
            value && value.filter(Boolean).map((val, i) => {
                return <AppItem color='paper' onClick={(e) => {
                    const isCloseButton = (e.target as any).className.split(' ').includes("close-button")
                    if (!isCloseButton) {
                        editItem(i)
                    }
                }} lines="full">
                    <AppButtons slot='start'>
                        <><AppIcon icon={returnDownForwardOutline} /></>
                    </AppButtons>
                    <AppChip key={i} >
                        {customTitleFunction ? customTitleFunction(val) : <>
                            {typeof val === "string" && val}
                            {typeof val === "object" && findShortestValue(val)}
                        </>}
                    </AppChip>

                    <AppButtons slot="end">

                        <AppButton fill="clear" color='danger' className={"close-button"} onClick={() => {
                            setValue(x => removeAtIndex(i, x));
                        }}>
                            <AppIcon icon={removeOutline} />
                        </AppButton>
                    </AppButtons>
                </AppItem>
            })
        }

        {
            value.length > 0 && <AppItem onClick={beginInsertItem}>
                <AppLabel>
                    <AppIcon color="primary" icon={addSharp} />
                </AppLabel>
                <AppButton expand="full" fill="clear" onClick={() => {
                    beginInsertItem()
                }} >
                </AppButton>
            </AppItem>
        }

        <AppFormErrorsItem errors={errors} />
    </ >
}

export default AppFormArrayInput;