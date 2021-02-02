import { addOutline } from 'ionicons/icons';
import React, { MutableRefObject, useState } from 'react';
import Validator, { PropertyDefinitionRef } from 'validator';
import { AppBackButton, AppButton, AppButtons, AppChip, AppContent, AppIcon, AppItem, AppLabel, AppModal, AppRow, AppText, AppToolbar } from '.';
import { AppColor } from '../theme/AppColor';
import { remove } from '../util';
import titleCase from '../util/titleCase';
import FormComposer, { formFieldChangeEvent } from './forms/AppFormComposer';

export interface ArrayPropertyInfo {
    type: "array",
    minItems: number,
    items: {
        $ref: string
    }
}

interface formInputProps<T> {
    inline?: boolean,
    property: string
    propertyInfo: ArrayPropertyInfo
    instanceRef: MutableRefObject<any>
    validator: Validator<T>
    onChange: formFieldChangeEvent
}

type InputStatus = "empty" | "invalid" | "valid";

const inputStatusColorMap: Record<InputStatus, AppColor> = { empty: "dark", valid: "favorite", invalid: "danger" }

/**
 * Component for input that displays validation errors
 */
const AppFormArrayInput = (props: formInputProps<unknown>) => {
    const { property, instanceRef, validator, onChange, inline } = props;
    const propertyInfo = { ...props.propertyInfo, ...inline ? validator.getReferenceInformation(props.propertyInfo) : {} } as PropertyDefinitionRef;
    const [errors, setErrors] = useState<string[] | undefined>(undefined);
    const [inputStatus, setInputStatus] = useState<InputStatus>("empty");
    const [isInsertingItem, setIsInsertingItem] = useState<boolean>(false);
    const [value, setValue] = useState<any[]>(instanceRef.current && (instanceRef.current as any)[property])
    const [data, setData] = useState<any>({})
    const [undoCache, setUndoCache] = useState<any>({});
    const propertyFormattedName = titleCase(property).replace("-", " ");
    const inputStatusColor = inputStatusColorMap[inputStatus];
    const beginInsertItem = (val: any = {}) => {
        if (typeof (value) === "undefined") { setValue([]) };
        setData(val);
        setUndoCache(val);
        setIsInsertingItem(true)
    };

    return <AppRow>
        <AppToolbar>
            <AppButtons slot='start'>
                <AppButton fill="clear" onClick={beginInsertItem} color={inputStatusColor} >
                    {propertyFormattedName}
                </AppButton>
            </AppButtons>
            <AppButtons>
                {value && value.map((val, i) => {
                    return <AppChip key={i} onClick={() => {
                        const valueRemoved = remove<unknown>((item) => item === val, value);
                        setValue(valueRemoved);
                        beginInsertItem(val);
                    }}>
                        {typeof val === "string" && val}
                        {["name", "description", "title"].map(k => val[k])}
                    </AppChip>
                })}
            </AppButtons>
            <AppButtons slot="end">
                <AppButton onClick={beginInsertItem} fill='outline' color={"primary"} >
                    <AppIcon icon={addOutline} />
                </AppButton>
            </AppButtons>
            <AppModal isOpen={isInsertingItem} onDismiss={() => setIsInsertingItem(false)}>
                <AppContent>
                    {isInsertingItem && <FormComposer
                        validator={validator}
                        data={data}
                        onSubmit={(item) => {
                            const newValue = [...value, item]
                            setValue(newValue);
                            setIsInsertingItem(false);
                            const [validationStatus, errors] = onChange(property, newValue);
                            setInputStatus(validationStatus);
                            setErrors(errors);
                        }} >
                        <AppBackButton onClick={() => {
                            if (validator.validate(undoCache)) {
                                const newValue = [...value, undoCache]
                                setValue(newValue);
                            }
                            setIsInsertingItem(false);
                        }} />
                    </FormComposer>}
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