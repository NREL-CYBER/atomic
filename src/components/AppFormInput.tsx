import React, { MutableRefObject, useEffect, useState } from 'react';
import { AppColor } from '../theme/AppColor';
import titleCase from '../util/titleCase';
import AppInput, { stringFormat } from './AppInput';
import AppItem from './AppItem';
import AppLabel from './AppLabel';
import AppText from './AppText';
import AppTextArea from './AppTextArea';
import { formFieldChangeEvent } from './forms/AppFormComposer';
import { PropertyDefinitionRef } from 'validator';


interface formInputProps<T> {
    propertyInfo: PropertyDefinitionRef
    property: string
    instanceRef: MutableRefObject<any>
    input: "line" | "text"
    onChange: formFieldChangeEvent
}

type InputStatus = "empty" | "invalid" | "valid";

const inputStatusColorMap: Record<InputStatus, AppColor> = { empty: "medium", valid: "favorite", invalid: "danger" }

type supported_schema_format = "email" | "date" | "time" | undefined

/**
 * Component for input that displays validation errors
 */
const AppFormInput = (props: formInputProps<any>) => {
    const { property, instanceRef, input, onChange, propertyInfo } = props;
    const [errors, setErrors] = useState<string[]>([]);
    const [inputStatus, setInputStatus] = useState<InputStatus>("empty");
    const [value, setValue] = useState<string>((instanceRef.current && (instanceRef.current as any)[property]) || null)
    const propertyFormattedName = titleCase(property || "").replaceAll("_", " ");

    const calculateType = () => {
        const accepted_formats = ["email", "date", "time"];
        const accepted_format_index = accepted_formats.indexOf(propertyInfo.format || "")
        if (accepted_format_index !== -1) {
            return accepted_formats[accepted_format_index] as supported_schema_format;
        } else if (propertyInfo.writeOnly) {
            return "password"
        } else {
            return undefined;
        }
    }




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

    const inputMode = calculateType();
    return <>
        <AppItem color="clear" lines="none">
            <AppLabel position="stacked" color={statusColor} >
                {propertyFormattedName}
            </AppLabel>
            {input === "line" || inputMode === "email" || inputMode === "password" || inputMode === "time" || inputMode === "date" ?
                <AppInput type={inputMode} value={value} placeholder={propertyFormattedName} onInputChange={(val) => {
                    console.log(val);
                    setValue(val)
                }} />
                : <AppTextArea inputMode={inputMode} value={value} onTextChange={(val) => {
                    console.log(val);
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