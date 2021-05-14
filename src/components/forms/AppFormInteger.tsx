import React, { MutableRefObject, useEffect, useState } from 'react';
import { PropertyDefinitionRef } from 'validator';
import { AppItem, AppLabel, AppText } from '..';
import { AppColor } from '../../theme';
import { prettyTitle } from '../../util';
import AppInput from '../AppInput';
import { formFieldChangeEvent } from './AppForm';


interface formInputProps {
    propertyInfo: PropertyDefinitionRef
    property: string
    instanceRef: MutableRefObject<any>
    onChange: formFieldChangeEvent
}

type InputStatus = "empty" | "invalid" | "valid";

const inputStatusColorMap: Record<InputStatus, AppColor> = { empty: "medium", valid: "favorite", invalid: "danger" };


/**
 * Component for input that displays validation errors
 */
const AppFormInteger = (props: formInputProps) => {
    const { property, instanceRef, onChange, propertyInfo } = props;
    const [errors, setErrors] = useState<string[]>([]);
    const [inputStatus, setInputStatus] = useState<InputStatus>("empty");
    const [value, setValue] = useState<string>((instanceRef.current && (instanceRef.current as any)[property]) || null)
    const propertyFormattedName = prettyTitle(propertyInfo.title || property);

    useEffect(() => {
        if (value === null) {
            return;
        }
        const formValue = value === "" ? "0" : value;
        const [validationStatus, validationErrors] = onChange(property, formValue ? parseInt(formValue) : 0);
        setInputStatus(validationStatus);
        setErrors(validationErrors || []);
    }, [onChange, property, value])

    const statusColor = inputStatusColorMap[inputStatus];

    return <>
        <AppItem color="clear" lines="none">
            <AppLabel position="stacked" color={statusColor} >
                {propertyFormattedName}
            </AppLabel>
            <AppInput type={"number"} value={value} placeholder={propertyFormattedName} onInputChange={(val) => {
                setValue(val)
            }} />
        </AppItem>

        {errors && errors.length > 0 && <AppItem>
            <AppLabel position='stacked' color='danger'>
                {errors.map((error, i) => <AppText key={i}>
                    {error}
                </AppText>)}
            </AppLabel>
        </AppItem>}
    </>
}

export default AppFormInteger;