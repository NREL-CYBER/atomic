/* eslint-disable no-script-url */
import produce from "immer";
import { addOutline, closeOutline } from 'ionicons/icons';
import { isArray } from "lodash";
import React, { MutableRefObject, useCallback, useMemo, useState } from 'react';
import { PropertyDefinitionRef, RootSchemaObject, SchemaObjectDefinition } from "validator";
import { AppBackButton, AppButton, AppButtons, AppChip, AppContent, AppFormComposer, AppIcon, AppItem, AppModal } from '.';
import { isUndefined, removeAtIndex } from '../util';
import prettyTitle from '../util/prettyTitle';
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
            .filter(x => x.length > 2)[0])
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
    const [edittingItemIndex, setEditingItemIndex] = useState<number | undefined>()
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
        const newValue = produce(value, (draftValue) => {
            if (typeof edittingItemIndex !== "undefined") {
                draftValue[edittingItemIndex] = item
            } else {
                draftValue.push(item);
            }
        });
        const validationResult = onChange(property, newValue)
        const [validationStatus, errors] = await validationResult
        setIsInsertingItem(false);
        setValue(newValue);
        setInputStatus(validationStatus);
        setErrors(errors);
        setEditingItemIndex(undefined);
        return validationResult;
    }, [edittingItemIndex, onChange, property, value])

    const onBackPressed = useCallback(() => {
        setIsInsertingItem(false);
    }, [])
    const itemId = propertyInfo.items?.$ref?.toString() || ""
    const customItemComponent = customComponentMap && customComponentMap[itemId]
    return <>
        <AppItem href={"javascript:void(0)"} onClick={(e) => {
            beginInsertItem()
        }}>
            <AppFormLabel required={required} onClick={() => {
                beginInsertItem()
            }} name={propertyFormattedName} color={inputStatusColor} />
            <AppButtons slot="end">
                <AppButton onClick={() => { beginInsertItem() }} fill='solid' color={"primary"} >
                    <AppIcon icon={addOutline} />
                </AppButton>
            </AppButtons>
        </AppItem>
        <div hidden={!isInsertingItem}>
            {<AppModal isOpen={isInsertingItem} onDismiss={() =>
                onBackPressed()
            }>
                <AppContent>
                    {useMemo(() => customItemComponent ? customItemComponent({
                        showFields,
                        hiddenFields,
                        lockedFields,
                        customComponentMap,
                        rootSchema, objectSchema,
                        onChange: onSubmitItem,
                        instanceRef: instanceRef,
                        property: property + edittingItemIndex,
                        propertyInfo,

                    }) : <AppFormComposer
                        showFields={showFields}
                        hiddenFields={hiddenFields}
                        lockedFields={lockedFields}
                        customComponentMap={customComponentMap}
                        rootSchema={rootSchema}
                        objectSchema={findSubSchema(rootSchema, objectSchema, propertyInfo)}
                        data={typeof edittingItemIndex !== "undefined" ? value[edittingItemIndex] : {}}
                        onSubmit={onSubmitItem} >
                        <AppBackButton onClick={() => onBackPressed()} />
                    </AppFormComposer>, [customItemComponent, showFields, hiddenFields, lockedFields, customComponentMap, rootSchema, objectSchema, onSubmitItem, instanceRef, propertyInfo, edittingItemIndex, value, onBackPressed])}
                </AppContent>
            </AppModal>}
        </div>
        {value && value.filter(Boolean).map((val, i) => {
            return <AppItem href={"javascript:void(0)"} onClick={(e) => {
                const isCloseButton = (e.target as any).className.split(' ').includes("close-button")
                if (!isCloseButton) {
                    editItem(i)
                }
            }} lines="full">
                <AppButtons slot="start">
                </AppButtons>
                <AppChip key={i} >
                    {customTitleFunction ? customTitleFunction(val) : <>
                        {typeof val === "string" && val}
                        {typeof val === "object" && findShortestValue(val)}
                    </>}
                </AppChip>
                <AppButtons slot="end">
                    <AppButton className={"close-button"} onClick={() => {
                        setValue(x => removeAtIndex(i, x));
                    }}>
                        <AppIcon icon={closeOutline} />
                    </AppButton>
                </AppButtons>
            </AppItem>
        })}
        <AppFormErrorsItem errors={errors} />
    </ >
}

export default AppFormArrayInput;