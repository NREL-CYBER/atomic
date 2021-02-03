import produce from "immer";
import { addOutline } from 'ionicons/icons';
import React, { MutableRefObject, useState } from 'react';
import { v4 } from 'uuid';
import Validator, { PropertyDefinitionRef } from 'validator';
import { AppBackButton, AppButton, AppButtons, AppChip, AppContent, AppIcon, AppItem, AppLabel, AppModal, AppRow, AppText, AppToolbar } from '..';
import { AppColor, AppFormComposer, titleCase } from '../..';
import { formFieldChangeEvent } from './AppFormComposer';


interface formInputProps<T> {
    inline?: boolean,
    property: string
    propertyInfo: PropertyDefinitionRef
    instanceRef: MutableRefObject<any>
    validator: Validator<T>
    onChange: formFieldChangeEvent
}

type InputStatus = "empty" | "invalid" | "valid";

const inputStatusColorMap: Record<InputStatus, AppColor> = { empty: "dark", valid: "favorite", invalid: "danger" }

/**
 * Component for input that displays validation errors
 */
const AppFormDictionaryInput = (props: formInputProps<unknown>) => {
    const { property, instanceRef, validator, onChange } = props;
    const [errors, setErrors] = useState<string[] | undefined>(undefined);
    const [inputStatus, setInputStatus] = useState<InputStatus>("empty");
    const [isInsertingItem, setIsInsertingItem] = useState<boolean>(false);
    const [value, setValue] = useState<any>(instanceRef.current[property] ? instanceRef.current[property] : {})
    const [data, setData] = useState<any>({})
    const [activeIndex, setActiveIndex] = useState<string | undefined>(undefined);
    const propertyFormattedName = titleCase(property).replace("-", " ");
    const inputStatusColor = inputStatusColorMap[inputStatus];
    const beginInsertItem = (index: string = v4(), val: any = {}) => {
        setActiveIndex(index);
        if (typeof (value) === "undefined") { setValue({}) };
        setData(val);
        setIsInsertingItem(true)
    };

    return <AppRow>
        <AppToolbar>
            <AppButtons slot='start'>
                <AppButton fill="clear" onClick={() => {
                    beginInsertItem()
                }} color={inputStatusColor} >
                    {propertyFormattedName}
                </AppButton>
            </AppButtons>
            <AppButtons>
                {value && Object.entries(value).map(([i, val]) => {
                    return <AppChip key={i} onClick={() => {
                        beginInsertItem(i, val);
                    }}>
                        {typeof val === "string" && val}
                        {typeof val === "object" && Object.values(val as Object)[0]}
                    </AppChip>
                })}
            </AppButtons>
            <AppButtons slot="end">
                <AppButton onClick={() => { beginInsertItem(v4()) }} fill='outline' color={"primary"} >
                    <AppIcon icon={addOutline} />
                </AppButton>
            </AppButtons>
            <AppModal isOpen={isInsertingItem} onDismiss={() => setIsInsertingItem(false)}>
                <AppContent>
                    {isInsertingItem && <AppFormComposer
                        validator={validator}
                        data={{ ...data }}
                        onSubmit={(item: any) => {
                            const newValue = produce(value, (draftValue) => {
                                draftValue[activeIndex ? activeIndex : v4()] = item;
                            });
                            const [validationStatus, errors] = onChange(property, newValue);
                            setIsInsertingItem(false);
                            setValue(newValue);
                            setInputStatus(validationStatus);
                            setErrors(errors);
                        }} >
                        <AppBackButton onClick={() => {
                            setIsInsertingItem(false);
                        }} />
                    </AppFormComposer>}
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

export default AppFormDictionaryInput;