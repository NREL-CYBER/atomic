import React, { MutableRefObject, useEffect, useState } from 'react';
import { PropertyDefinitionRef } from 'validator';
import { AppColor } from '../theme/AppColor';
import { prettyTitle } from '../util';
import AppInput from './AppInput';
import AppItem from './AppItem';
import AppLabel from './AppLabel';
import AppText from './AppText';
import AppTextArea from './AppTextArea';
import { formFieldChangeEvent } from './forms/AppForm';


interface formInputProps<T> {
    propertyInfo: PropertyDefinitionRef
    property: string
    instanceRef: MutableRefObject<T>
    input: "line" | "text" | "array"
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
    const instance = instanceRef.current && (instanceRef.current as any)[property];

    const instanceType = typeof instance;

    // This component supports arrays as input for fields that are simply arrays of strings for multi-line content
    // If this is confusing, learn more about ternary operators:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
    // This is a chained Ternary:
    const [value, setValue] = useState<string>(
        instanceType === "undefined" ? undefined :
            input !== "array" ? instance :
                typeof instance === "object" ? instance.join("\n") :
                    instance);

    const propertyFormattedName = prettyTitle(propertyInfo.title ? propertyInfo.title : property || "");

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
        if (value === null || value === "" || typeof value === "undefined") {
            setInputStatus("empty");
            return;
        }
        const formValue = value === "" ? undefined : value;
        const propertyValue = input === "array" ? (formValue || "").split("\n") : formValue;
        const [validationStatus, validationErrors] = onChange(property, propertyValue);
        setInputStatus(validationStatus);
        setErrors(validationErrors || []);
    }, [input, onChange, property, value])

    const statusColor = inputStatusColorMap[inputStatus];

    const inputMode = calculateType();
    return <>
        <AppItem color="clear" lines="none">
            <AppLabel position="stacked" color={statusColor} >
                {propertyFormattedName}
            </AppLabel>
            {input === "line" || inputMode === "email" || inputMode === "password" || inputMode === "time" || inputMode === "date" ?
                <AppInput color="dark" type={inputMode} value={value} placeholder={propertyFormattedName} onInputChange={(val) => {
                    setValue(val)
                }} />
                : <AppTextArea  color="dark" inputMode={inputMode || "text"} value={value} onTextChange={(val) => {
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