import produce from "immer";
import { addOutline } from 'ionicons/icons';
import React, { MutableRefObject, useState } from 'react';
import Validator, { PropertyDefinitionRef } from 'validator';
import { AppBackButton, AppButton, AppButtons, AppChip, AppContent, AppIcon, AppItem, AppLabel, AppModal, AppRow, AppText, AppToolbar } from '.';
import { remove } from '../util';
import prettyTitle from '../util/prettyTitle';
import { InputStatus, inputStatusColorMap } from "./AppFormInput";
import AppForm, { formFieldChangeEvent, nestedFormProps } from './forms/AppForm';


interface formInputProps<T> {
    inline?: boolean,
    property: string
    propertyInfo: PropertyDefinitionRef
    instanceRef: MutableRefObject<any>
    validator: Validator<T>
    onChange: formFieldChangeEvent,
    showFields?: string[],
    hiddenFields?: string[],
    lockedFields?: string[],
    customComponentMap?: Record<string, React.FC<nestedFormProps>>
}



export const findShortestValue = (val: any) => {
    /**This looks like vooodooo, but it is just displaying the value 
                     * that is the shortest, which is usually the title || name */
    const standard_values = ["name", "title"]

    Object.keys(val).forEach((key) => {
        standard_values.forEach((visible_key) => {
            if (key.includes(visible_key))
                return val[key];
        })
    });
    return String(
        Object
            .values(val as Object)
            .sort((a, b) => String(a).length - String(b).length).filter(x => x.length > 2)[0])
}

/**
 * Component for input that displays validation errors
 */
const AppFormArrayInput = (props: formInputProps<unknown>) => {
    const { property, instanceRef, validator, onChange, propertyInfo, customComponentMap, hiddenFields, lockedFields, showFields } = props;
    const [errors, setErrors] = useState<string[] | undefined>(undefined);
    const [inputStatus, setInputStatus] = useState<InputStatus>("empty");
    const [isInsertingItem, setIsInsertingItem] = useState<boolean>(false);
    const [value, setValue] = useState<any[]>(instanceRef.current[property] ? instanceRef.current[property] : [])
    const [data, setData] = useState<any>({})
    const [undoCache, setUndoCache] = useState<any>();
    const propertyFormattedName = prettyTitle(propertyInfo.title || property);
    const inputStatusColor = inputStatusColorMap[inputStatus];
    const beginInsertItem = (val: any = {}) => {
        if (typeof (value) === "undefined") { setValue([]) };
        setData(val);
        setUndoCache(val);
        setIsInsertingItem(true)
    };
    const removeAndbeginInsert = (val: any) => {
        const valueRemoved = remove<unknown>((item) => item === val, value);
        setValue(valueRemoved);
        beginInsertItem(val);
    }


    const onSubmitItem = (item: any) => {
        const newValue = produce(value, (draftValue) => {
            draftValue.push(item);
        });
        const [validationStatus, errors] = onChange(property, newValue);
        setIsInsertingItem(false);
        setValue(newValue);
        setInputStatus(validationStatus);
        setErrors(errors);
    }

    const onBackPressed = () => {
        if (validator.validate(undoCache)) {
            const newValue = [...value, undoCache]
            setValue(newValue);
        }
        setIsInsertingItem(false);
    }
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
                    const valType = typeof val
                    return <AppChip key={i} onClick={() => removeAndbeginInsert(val)}>
                        {valType === "string" && val}
                        {valType === "object" && findShortestValue(val)}
                    </AppChip>
                })}
            </AppButtons>
            <AppButtons slot="end">
                <AppButton onClick={() => { beginInsertItem() }} fill='solid' color={"primary"} >
                    <AppIcon icon={addOutline} />
                </AppButton>
            </AppButtons>
            <AppModal isOpen={isInsertingItem} onDismiss={() => setIsInsertingItem(false)}>
                <AppContent>
                    {isInsertingItem && <AppForm
                        showFields={showFields}
                        hiddenFields={hiddenFields}
                        lockedFields={lockedFields}
                        customComponentMap={customComponentMap}
                        validator={validator}
                        data={{ ...data }}
                        onSubmit={onSubmitItem} >
                        <AppBackButton onClick={onBackPressed} />
                    </AppForm>}
                </AppContent>
            </AppModal>
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