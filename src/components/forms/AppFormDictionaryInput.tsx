import produce from "immer";
import { addOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { v4 } from 'uuid';
import { AppBackButton, AppButton, AppButtons, AppContent, AppForm, AppIcon, AppItem, AppLabel, AppModal, AppRow, AppText, AppToolbar } from '..';
import { prettyTitle } from "../../util";
import { VisualizeValue } from "../AppFormArrayInput";
import { InputStatus, inputStatusColorMap } from "../AppFormInput";
import { findSubSchema, nestedFormProps } from './AppForm';




/**
 * Component for input that displays validation errors
 */
const AppFormDictionaryInput = (props: nestedFormProps) => {
    //destructure props
    const { property, instanceRef, objectSchema, onChange,
        propertyInfo, customInputMap, hiddenFields, customRenderMap,
        lockedFields, showFields, rootSchema } = props;
    const { title } = propertyInfo;
    //local state
    const [errors, setErrors] = useState<string[] | undefined>(undefined);
    const [inputStatus, setInputStatus] = useState<InputStatus>("empty");
    const [isInsertingItem, setIsInsertingItem] = useState<boolean>(false);
    const [value, setValue] = useState<Record<string, any>>(instanceRef.current[property] ? instanceRef.current[property] : {})
    const [data, setData] = useState<any>({})
    const [activeIndex, setActiveIndex] = useState<string | undefined>(undefined);
    //local queries
    const propertyFormattedName = prettyTitle(title || property)
    const inputStatusColor = inputStatusColorMap[inputStatus];
    //local events
    const beginInsertItem = (index: string = v4(), val: any = {}) => {
        setActiveIndex(index);
        if (typeof (value) === "undefined") { setValue({}) };
        setData(val);
        setIsInsertingItem(true)
    };
    const onSubmitValue = (item: any) => {
        const newValue = produce(value, (draftValue: { [x: string]: any; }) => {
            draftValue[activeIndex ? activeIndex : v4()] = item;
        });
        onChange(property, newValue).then(([validationStatus, errors]) => {
            setIsInsertingItem(false);
            setValue(newValue);
            setInputStatus(validationStatus);
            setErrors(errors);
        });
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
                {value && Object.entries(value).map(([prop, val]) => {

                    return <VisualizeValue propertyInfo={objectSchema.properties ? objectSchema.properties[prop] : propertyInfo} customRenderMap={customRenderMap} value={val} />

                })}
            </AppButtons>
            <AppButtons slot="end">
                <AppButton onClick={() => { beginInsertItem(v4()) }} fill='solid' color={"primary"} >
                    <AppIcon icon={addOutline} />
                </AppButton>
            </AppButtons>
            <AppModal isOpen={isInsertingItem} onDismiss={() => setIsInsertingItem(false)}>
                <AppContent>
                    {isInsertingItem && <AppForm
                        customInputMap={customInputMap}
                        objectSchema={findSubSchema(rootSchema, objectSchema, propertyInfo)}
                        rootSchema={rootSchema}
                        data={{ ...data }}
                        showFields={showFields}
                        hiddenFields={hiddenFields}
                        lockedFields={lockedFields}

                        onSubmit={onSubmitValue} >
                        <AppBackButton onClick={() => {
                            setIsInsertingItem(false);
                        }} />
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

export default AppFormDictionaryInput;