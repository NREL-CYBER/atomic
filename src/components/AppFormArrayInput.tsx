/* eslint-disable no-script-url */
import { AppBadge, AppCol, AppGrid, AppLabel, AppRow, AppText } from "atomic";
import produce from "immer";
import { addSharp, removeOutline, returnDownForwardOutline } from 'ionicons/icons';
import { isArray, isNull, values } from "lodash";
import React, { useCallback, useMemo, useState } from 'react';
import { PropertyDefinitionRef } from "validator";
import { AppBackButton, AppButton, AppButtons, AppChip, AppForm, AppIcon, AppItem, AppModal } from '.';
import { isUndefined, removeAtIndex } from '../util';
import prettyTitle from '../util/prettyTitle';
import { uniqueObjects } from "../util/unique";
import AppCard from "./AppCard";
import { InputStatus, inputStatusColorMap } from "./AppFormInput";
import { VisualizeValue } from "./AppJsonDisplay";
import { findSubSchema, nestedFormProps } from './forms/AppForm';
import { AppFormErrorsItem } from "./forms/AppFormErrorsItem";
import { AppFormLabel } from "./forms/AppFormLabel";
import { AppTable, AppTableList } from "./global/AppTable";


interface formInputProps extends nestedFormProps {
    required?: boolean
    inline?: boolean,
    customRenderMap?: Record<string, React.FC<{ value: any }>>
    customInputMap?: Record<string, React.FC<nestedFormProps>>
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
    const { property, instanceRef, onChange,
        propertyInfo, hiddenFields, lockedFields, showFields, required,
        objectSchema, rootSchema, dependencyMap, customInputMap, customRenderMap } = props;
    const existing_data: any[] = instanceRef.current[property] ? instanceRef.current[property] : [];
    const [errors, setErrors] = useState<string[] | undefined>(undefined);
    const [inputStatus, setInputStatus] = useState<InputStatus>(existing_data.length > 0 ? "valid" : "empty");
    const [isInsertingItem, setIsInsertingItem] = useState<boolean>(false);
    const [value, setValue] = useState<any[]>(existing_data)
    const [editingItemIndex, setEditingItemIndex] = useState<number | undefined>()
    const propertyFormattedName = prettyTitle(propertyInfo.title || property);
    const inputStatusColor = inputStatusColorMap[inputStatus];
    const beginInsertItem = (index: number) => {
        setEditingItemIndex(index);
        if (isUndefined(value)) {
            setValue([])
        };
        setIsInsertingItem(true)
    };
    const editItem = (index: number) => {
        beginInsertItem(index);
    }
    const deleteItem = useCallback(async (i: number) => {
        const newValue = removeAtIndex(i, value)
        const validationResult = onChange(property, newValue)
        validationResult.then(([validationStatus, errors]) => {
            setIsInsertingItem(false);
            setValue(newValue);
            setInputStatus(validationStatus);
            setErrors(errors);
            setEditingItemIndex(undefined);
        })
        return validationResult;
    }, [onChange, property, value])
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
            setValue(newValue);
            setErrors(errors); if (errors) {
                return;
            }
            setIsInsertingItem(false);
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
    const customItemComponent = customInputMap && customInputMap[itemId]
    const subSchema = findSubSchema(rootSchema, objectSchema, propertyInfo);
    const elementTitle = propertyFormattedName + "[" + (typeof editingItemIndex === "number" ? editingItemIndex : values.length) + "]";
    return <>
        <AppItem onClick={(e) => {
            beginInsertItem(values.length);
        }}>
            {value.length === 0 && <AppButtons slot="end">
                <AppButton fill="clear" color='primary' className={"close-button"}>
                    <AppIcon icon={addSharp} />
                </AppButton>
            </AppButtons>}

            <AppFormLabel required={required} onClick={() => {
                beginInsertItem(values.length)
            }} name={propertyFormattedName + ' [' + value.length + ']'} color={inputStatusColor} />
        </AppItem>
        <div hidden={!isInsertingItem}>
            {<AppModal isOpen={isInsertingItem} onDismiss={() =>
                onBackPressed()
            }>
                {customItemComponent ? <AppCard
                    title={elementTitle}>{
                        customItemComponent({
                            showFields, hiddenFields,
                            lockedFields, customRenderMap,
                            customInputMap, rootSchema,
                            dependencyMap, objectSchema: subSchema,
                            onChange: (_, v) => {
                                return onSubmitItem(v);
                            },
                            instanceRef: {
                                current: {
                                    item: value &&
                                        typeof editingItemIndex !== 'undefined' ?
                                        value[editingItemIndex] ?
                                            subSchema.type === "object" ?
                                                {} : subSchema.type === "array" ?
                                                    [] : undefined : undefined : undefined
                                }
                            }, property: "item", propertyInfo,
                            context: value
                        })}
                </AppCard> : <AppForm
                    title={elementTitle}
                    showFields={showFields}
                    hiddenFields={hiddenFields}
                    lockedFields={lockedFields}
                    customInputMap={customInputMap}
                    rootSchema={rootSchema}
                    dependencyMap={dependencyMap}
                    objectSchema={subSchema}
                    data={typeof editingItemIndex !== "undefined" ? value[editingItemIndex] : {}}
                    context={value}
                    onSubmit={onSubmitItem} >
                    <AppBackButton onClick={() => onBackPressed()} />
                </AppForm>}
            </AppModal>}
        </div>
        {
            useMemo(() => value && value.filter(Boolean).map((val, i) => {
                return <AppItem lines="none" key={i} color='paper' onClick={(e) => {
                    const className = (e.target as any).className || "";
                    if (typeof className !== "string" || (e.target as any).nodeName === "svg") {
                        return;
                    }
                    const isCloseButton = (className).split(' ').includes("close-button")
                    if (!isCloseButton) {
                        editItem(i)
                    }
                }} >
                    <AppButtons slot='start'>
                        <><AppIcon icon={returnDownForwardOutline} /></>
                    </AppButtons>

                    <VisualizeValue
                        customRenderMap={customRenderMap}
                        propertyInfo={propertyInfo}
                        value={val} />

                    <AppButtons slot="end">

                        <AppButton fill="clear" color='danger' className={"close-button"} onClick={() => {
                            deleteItem(i)
                        }}>
                            <AppIcon icon={removeOutline} />
                        </AppButton>
                    </AppButtons>
                </AppItem>
            }), [customRenderMap, deleteItem, editItem, propertyInfo, value])
        }

        {
            value.length > 0 && <AppItem onClick={(id) => beginInsertItem(value.length)}>
                <AppLabel>
                    <AppIcon color="primary" icon={addSharp} />
                </AppLabel>
            </AppItem>
        }

        <AppFormErrorsItem errors={errors} />
    </ >
}

export default AppFormArrayInput;