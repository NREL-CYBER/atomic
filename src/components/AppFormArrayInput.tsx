import produce from "immer";
import { addOutline, closeOutline } from 'ionicons/icons';
import React, { MutableRefObject, useCallback, useMemo, useState } from 'react';
import { PropertyDefinitionRef, RootSchemaObject, SchemaObjectDefinition } from "validator";
import { AppBackButton, AppButton, AppButtons, AppChip, AppContent, AppFormComposer, AppIcon, AppItem, AppLabel, AppModal, AppRow, AppText, AppToolbar } from '.';
import { remove, removeAtIndex } from '../util';
import prettyTitle from '../util/prettyTitle';
import AppBadge from "./AppBadge";
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
    customItemComponent?: React.FC<nestedFormProps>
}



export const findShortestValue = (val: any) => {
    /**This looks like vooodooo, but it is just displaying the value 
                     * that is the shortest, which is usually the title || name */
    const standard_values = ["name", "title"]
    const keys = Object.keys(val);
    const standard_keys = keys.filter((k) => standard_values.includes(k))
    if (standard_keys.length > 0) {
        return val[standard_keys[0]];
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
        objectSchema, rootSchema, customItemComponent } = props;
    const existing_data: any[] = instanceRef.current[property] ? instanceRef.current[property] : [];
    const [errors, setErrors] = useState<string[] | undefined>(undefined);
    const [inputStatus, setInputStatus] = useState<InputStatus>(existing_data.length > 0 ? "valid" : "empty");
    const [isInsertingItem, setIsInsertingItem] = useState<boolean>(false);
    const [value, setValue] = useState<any[]>(existing_data)
    const [edittingItemIndex, setEditingItemIndex] = useState<number | undefined>()
    const propertyFormattedName = prettyTitle(propertyInfo.title || property);
    const inputStatusColor = inputStatusColorMap[inputStatus];
    const beginInsertItem = (val: any = {}) => {
        if (typeof (value) === "undefined") {
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
            draftValue.push(item);
        });
        const [validationStatus, errors] = await onChange(property, newValue);
        setIsInsertingItem(false);
        setValue(newValue);
        setInputStatus(validationStatus);
        setErrors(errors);
    }, [onChange, property, value])

    const onBackPressed = useCallback(() => {
        setIsInsertingItem(false);
    }, [])
    return <>
        <AppItem href={"javascript:void(0)"} onClick={() => {
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
                    {useMemo(() => customItemComponent ? customItemComponent : <AppFormComposer
                        showFields={showFields}
                        hiddenFields={hiddenFields}
                        lockedFields={lockedFields}
                        customComponentMap={customComponentMap}
                        rootSchema={rootSchema}
                        objectSchema={findSubSchema(rootSchema, objectSchema, propertyInfo)}
                        data={typeof edittingItemIndex !== "undefined" ? value[edittingItemIndex] : {}}
                        onSubmit={onSubmitItem} >
                        <AppBackButton onClick={() => onBackPressed()} />
                    </AppFormComposer>, [customItemComponent, showFields, hiddenFields, lockedFields, customComponentMap, rootSchema, objectSchema, propertyInfo, edittingItemIndex, value, onSubmitItem, onBackPressed])}
                </AppContent>
            </AppModal>}
        </div>
        {value && value.filter(Boolean).map((val, i) => {
            return <AppItem >
                <AppButtons slot="start">

                </AppButtons>
                <AppChip key={i} onClick={() => editItem(i)}>
                    {customTitleFunction ? customTitleFunction(val) : <>
                        {typeof val === "string" && val}
                        {typeof val === "object" && findShortestValue(val)}
                    </>}
                </AppChip>
                <AppButtons slot="end">
                    <AppButton onClick={() => {
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