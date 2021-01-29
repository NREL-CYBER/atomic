import { addOutline } from 'ionicons/icons';
import React, { MutableRefObject, useState } from 'react';
import Validator from 'validator';
import { AppBackButton, AppButton, AppButtons, AppChip, AppContent, AppIcon, AppItem, AppLabel, AppModal, AppRow, AppText, AppToolbar } from '.';
import { AppColor } from '../theme/AppColor';
import titleCase from '../util/titleCase';
import FormComposer, { formFieldChangeEvent } from './forms/AppFormComposer';
import { remove } from '../util';

export interface ArrayPropertyInfo {
    type: "array",
    minItems: number,
    items: {
        $ref: string
    }
}

interface formInputProps<T> {
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
    const { property, instanceRef, validator, propertyInfo, onChange } = props;
    const [errors, setErrors] = useState<string[] | undefined>(undefined);
    const [inputStatus, setInputStatus] = useState<InputStatus>("empty");
    const [isInsertingItem, setIsInsertingItem] = useState<boolean>(false);
    const [value, setValue] = useState<any[]>(instanceRef.current && (instanceRef.current as any)[property])
    const [data, setData] = useState<any>({})
    const propertyFormattedName = titleCase(property).replace("-", " ");
    const inputStatusColor = inputStatusColorMap[inputStatus];
    return <AppRow>
        <AppToolbar>
            <AppButtons slot='start'>
                <AppLabel color={inputStatusColor} >
                    {propertyFormattedName}
                </AppLabel>
            </AppButtons>
            <AppButtons>
                {value && value.map((val, i) => {
                    const viewPropKey = Object.keys(val).filter((key) => {
                        return ["name", "value", "text", "title"].filter(viewPropLike => key.toLowerCase().includes(viewPropLike))
                    })[0]
                    return <AppChip key={i} onClick={() => {
                        setData(val);
                        const valueRemoved = remove<unknown>((item) => item === val, value);
                        setValue(valueRemoved);
                        setIsInsertingItem(true);
                    }}>
                        {val[viewPropKey] || val}
                    </AppChip>
                })}
            </AppButtons>
            <AppButtons slot="end">
                <AppButton onClick={() => {
                    if (typeof (value) === "undefined") { setValue([]) };
                    setData({});
                    setIsInsertingItem(true)
                }} fill='outline' color={"primary"} >
                    <AppIcon icon={addOutline} />
                </AppButton>
            </AppButtons>
            <AppModal isOpen={isInsertingItem} onDismiss={() => setIsInsertingItem(false)}>
                <AppContent>
                    {isInsertingItem && <FormComposer
                        validator={validator.makeReferenceValidator(propertyInfo)}
                        data={data}
                        onSubmit={(item) => {
                            const newValue = [...value, item]
                            setValue(newValue);
                            setIsInsertingItem(false);
                            const [validationStatus, errors] = onChange(property, newValue);
                            setInputStatus(validationStatus);
                            setErrors(errors);

                        }} >
                        <AppBackButton onClick={() => setIsInsertingItem(false)} />
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