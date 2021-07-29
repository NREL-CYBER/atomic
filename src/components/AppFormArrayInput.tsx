import produce from "immer";
import { addOutline } from 'ionicons/icons';
import React, { MutableRefObject, Suspense, useCallback, useMemo, useState } from 'react';
import { PropertyDefinitionRef, RootSchemaObject, SchemaObjectDefinition } from "validator";
import { AppBackButton, AppButton, AppButtons, AppChip, AppContent, AppFormComposer, AppIcon, AppItem, AppLabel, AppLoadingCard, AppModal, AppRow, AppText, AppToolbar } from '.';
import { remove } from '../util';
import prettyTitle from '../util/prettyTitle';
import { InputStatus, inputStatusColorMap } from "./AppFormInput";
import { findSubSchema, formFieldChangeEvent, nestedFormProps } from './forms/AppForm';


interface formInputProps {
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
        propertyInfo, customComponentMap, hiddenFields, lockedFields, showFields, objectSchema, rootSchema } = props;
    const [errors, setErrors] = useState<string[] | undefined>(undefined);
    const [inputStatus, setInputStatus] = useState<InputStatus>("empty");
    const [isInsertingItem, setIsInsertingItem] = useState<boolean>(false);
    const [value, setValue] = useState<any[]>(instanceRef.current[property] ? instanceRef.current[property] : [])
    const [data, setData] = useState<any>({})
    const [, setUndoCache] = useState<any>();
    const propertyFormattedName = prettyTitle(propertyInfo.title || property);
    const inputStatusColor = inputStatusColorMap[inputStatus];
    const beginInsertItem = (val: any = {}) => {
        if (typeof (value) === "undefined") {
            setValue([])
        };
        setData(val);
        setUndoCache(val);
        setIsInsertingItem(true)
    };
    const removeAndbeginInsert = (val: any) => {
        const valueRemoved = remove<unknown>((item) => item === val, value);
        setValue(valueRemoved);
        beginInsertItem(val);
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
    return <AppRow>
        <AppToolbar color="clear">
            <AppButtons slot='start'>
                <AppButton fill="clear" onClick={() => {
                    beginInsertItem()
                }} color={inputStatusColor} >
                    {propertyFormattedName}
                </AppButton>
            </AppButtons>
            <AppButtons>
                {value && value.map((val, i) => {
                    return <AppChip key={i} onClick={() => removeAndbeginInsert(val)}>
                        {customTitleFunction ? customTitleFunction(val) : <>
                            {typeof val === "string" && val}
                            {typeof val === "object" && findShortestValue(val)}
                        </>}
                    </AppChip>
                })}
            </AppButtons>
            <AppButtons slot="end">
                <AppButton onClick={() => { beginInsertItem() }} fill='solid' color={"primary"} >
                    <AppIcon icon={addOutline} />
                </AppButton>
            </AppButtons>
            <div hidden={!isInsertingItem}>
                {<AppModal isOpen={isInsertingItem} onDismiss={() => setIsInsertingItem(false)}>
                    <Suspense fallback={<AppLoadingCard />}>
                        <AppContent>
                            {useMemo(() => <AppFormComposer
                                showFields={showFields}
                                hiddenFields={hiddenFields}
                                lockedFields={lockedFields}
                                customComponentMap={customComponentMap}
                                rootSchema={rootSchema}
                                objectSchema={findSubSchema(rootSchema, objectSchema, propertyInfo)}
                                data={{ ...data }}
                                onSubmit={onSubmitItem} >
                                <AppBackButton onClick={onBackPressed} />
                            </AppFormComposer>, [customComponentMap, data, hiddenFields, lockedFields, objectSchema, onBackPressed, onSubmitItem, propertyInfo, rootSchema, showFields])}
                        </AppContent>
                    </Suspense>
                </AppModal>}
            </div>
        </AppToolbar>
        {
            errors && errors.length > 0 && < AppItem >

                <AppLabel position='stacked' color='danger'>
                    {errors.map(error => <AppText>
                        {error}
                    </AppText>)}
                </AppLabel>
            </AppItem>
        }
    </AppRow >
}

export default AppFormArrayInput;