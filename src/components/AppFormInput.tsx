import { ErrorObject } from 'ajv';
import React, { MutableRefObject, useEffect, useState } from 'react';
import { AppColor } from '../theme/AppColor';
import titleCase from '../util/titleCase';
import AppInput from './AppInput';
import AppItem from './AppItem';
import AppLabel from './AppLabel';
import AppText from './AppText';
import AppTextArea from './AppTextArea';
import { formFieldChangeEvent } from './forms/AppFormComposer';
import AppItemDivider from './AppItemDivider';


interface formInputProps<T> {
    property: string
    instanceRef: MutableRefObject<any>
    input: "line" | "text"
    onChange: formFieldChangeEvent
}

type InputStatus = "empty" | "invalid" | "valid";

const inputStatusColorMap: Record<InputStatus, AppColor> = { empty: "dark", valid: "favorite", invalid: "danger" }

/**
 * Component for input that displays validation errors
 */
const AppFormInput = (props: formInputProps<any>) => {
    const { property, instanceRef, input, onChange } = props;
    const [errors, setErrors] = useState<string[]>([]);
    const [inputStatus, setInputStatus] = useState<InputStatus>("empty");
    const [value, setValue] = useState<string>((instanceRef.current && (instanceRef.current as any)[property]) || null)
    const propertyFormattedName = titleCase(property);





    useEffect(() => {
        if (value === null) {
            return;
        }
        const formValue = value === "" ? undefined : value;
        const [validationStatus, validationErrors] = onChange(property, formValue);
        console.log(validationStatus);
        setInputStatus(validationStatus);
        setErrors(validationErrors || []);
    }, [onChange, property, value])

    const statusColor = inputStatusColorMap[inputStatus];
    return <>
        <AppItem lines="none">
            <AppLabel position="stacked" color={statusColor} >
                {propertyFormattedName}
            </AppLabel>
            {input === "line" ?
                <AppInput value={value} placeholder={propertyFormattedName} onInputChange={(val) => {
                    setValue(val)
                }} />
                : <AppTextArea value={value} onTextChange={(val) => {
                    setValue(val);
                }} />}
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

export default AppFormInput;