import React, { useEffect, useMemo, useState } from 'react';
import { AppColor } from '../theme/AppColor';
import { prettyTitle } from '../util';
import AppInput from './AppInput';
import AppItem from './AppItem';
import AppTextArea from './AppTextArea';
import { formElementProps } from './forms/AppForm';
import { AppFormErrorsItem } from './forms/AppFormErrorsItem';
import { AppFormLabel } from './forms/AppFormLabel';


interface formInputProps extends formElementProps {
    input: "line" | "text" | "array"
}

export type InputStatus = "empty" | "invalid" | "unknown" | "valid";

export const inputStatusColorMap: Record<InputStatus, AppColor> = { empty: "medium", valid: "favorite", unknown: 'tertiary', invalid: "danger" }

type supported_schema_format = "email" | "date" | "time" | undefined

/**
 * Component for input that displays validation errors
 */
const AppFormInput = (props: formInputProps) => {
    const { property, instanceRef, input, onChange, propertyInfo, required } = props;
    const { description } = propertyInfo;
    const [errors, setErrors] = useState<string[] | undefined>();
    const [validating, setValidating] = useState<any>();
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
        if (value === validating) {
            return;
        }
        if (value === null || value === "" || typeof value === "undefined") {
            setInputStatus("empty");
            setErrors([]);
            return;
        }
        const formValue = value === "" ? undefined : value;
        const propertyValue = input === "array" ? (formValue || "").split("\n") : formValue;
        setValidating(value);
        onChange(property, propertyValue).then(([validationStatus, errors]) => {
            setInputStatus(validationStatus);
            setErrors(errors);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input, onChange, property, value])

    const statusColor = inputStatusColorMap[inputStatus];

    const inputMode = calculateType();
    return <>
        <AppItem >
            <AppFormLabel name={propertyFormattedName}
                color={statusColor}
                required={required}
            />

            {useMemo(() => <>{property === "name" || property === "title" || input === "line" || inputMode === "email" || inputMode === "password" || inputMode === "time" || inputMode === "date" ?
                <AppInput color="dark" type={inputMode} value={value} placeholder={description || ""} onInputChange={(val) => {
                    setValue(val)
                }} />
                : <span style={{ width: "100%" }}><AppTextArea  rows={property === "description" ? 5 : 3} placeholder={description} color="dark" inputMode={inputMode || "text"} value={value} onTextChange={(val) => {
                    setValue(val);
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                }} /></span>}</>, [input])}
        </AppItem>

        <AppFormErrorsItem errors={errors} />
    </>
}

export default AppFormInput;