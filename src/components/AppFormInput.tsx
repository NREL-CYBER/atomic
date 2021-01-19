import { ErrorObject } from 'ajv';
import React, { MutableRefObject, useEffect, useState } from 'react';
import Validator from 'validator';
import { AppColor } from '../theme/AppColor';
import titleCase from '../util/titleCase';
import AppInput from './AppInput';
import AppItem from './AppItem';
import AppLabel from './AppLabel';
import AppText from './AppText';
import AppTextArea from './AppTextArea';


interface formInputProps<T> {
    property: string
    instanceRef: MutableRefObject<any>
    validator: Validator<T>
    input: "line" | "text"
    onValid: (property: string) => void
}

type InputStatus = "empty" | "invalid" | "valid";

const inputStatusColorMap: Record<InputStatus, AppColor> = { empty: "dark", valid: "favorite", invalid: "danger" }

/**
 * Component for input that displays validation errors
 */
const AppFormInput = (props: formInputProps<any>) => {
    const { property, instanceRef, validator, input, onValid } = props;
    const [errors, setErrors] = useState<ErrorObject[]>([]);
    const [inputStatus, setInputStatus] = useState<InputStatus>("empty");
    const [value, setValue] = useState<string>((instanceRef.current && (instanceRef.current as any)[property]) || undefined)

    const propertyFormattedName = titleCase(property);

    useEffect(() => {
        if (value === undefined) {
            return;
        }
        if (value.length === 1) {
            return;
        } else {
            const change: Record<string, string> = {}
            change[property] = value
            instanceRef.current = { ...instanceRef.current, ...change }
        }
        const allErrors = validator.validate.errors || []
        const propertyErrors = allErrors.filter(error => error.message && error.message.includes(property))
        if (propertyErrors.length === 0 && value) {
            setInputStatus("valid");
        } else if (value) {
            setInputStatus("invalid");
        } else {
            setInputStatus("empty");
        }
        propertyErrors && setErrors(propertyErrors);
    }, [instanceRef, property, validator, value, validator.validate.errors])

    useEffect(() => {
        validator.validate(instanceRef.current);
    }, [instanceRef, validator, value])


    const inputStatusColor = inputStatusColorMap[inputStatus];

    const handleLoseFocus = () => { console.log("lose focus"); inputStatus === "valid" && onValid(property) };
    return <>
        <AppItem>
            <AppLabel position="stacked" color={inputStatusColor} >
                {propertyFormattedName}
            </AppLabel>
            {input === "line" ?
                <AppInput onLoseFocus={handleLoseFocus} value={value} placeholder={propertyFormattedName} onInputChange={(val) => { setValue(val) }} />
                : <AppTextArea onLoseFocus={handleLoseFocus} value={value} onTextChange={(val) => {
                    setValue(val);
                }} />}
        </AppItem>
        {errors && errors.length > 0 && <AppItem>
            <AppLabel position='stacked' color='danger'>
                {errors.map(error => <AppText>
                    {error.message}
                </AppText>)}
            </AppLabel>
        </AppItem>}
    </>
}

export default AppFormInput;