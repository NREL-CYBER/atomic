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
    onChange: (property: string) => void
}

type InputStatus = "empty" | "invalid" | "valid";

const inputStatusColorMap: Record<InputStatus, AppColor> = { empty: "dark", valid: "favorite", invalid: "danger" }

/**
 * Component for input that displays validation errors
 */
const AppFormInput = (props: formInputProps<any>) => {
    const { property, instanceRef, validator, input, onChange } = props;
    const [errors, setErrors] = useState<ErrorObject[]>([]);
    const [inputStatus, setInputStatus] = useState<InputStatus>("empty");
    const [value, setValue] = useState<string>((instanceRef.current && (instanceRef.current as any)[property]) || null)

    const propertyFormattedName = titleCase(property);

    useEffect(() => {
        const change: Record<string, any> = {}
        if (value === null) {
            return;
        }
        change[property] = value === "" ? undefined : value;
        instanceRef.current = { ...instanceRef.current, ...change }
    }, [instanceRef, property, value])

    useEffect(() => {
        validator.validate(instanceRef.current);
        const allErrors = validator.validate.errors || []
        const propertyErrors = allErrors.filter(error => error.message && error.message.includes(property))
        if (propertyErrors.length === 0 && value) {
            console.log("valid input status")
            setInputStatus("valid");
        } else if (value) {
            console.log("inValid input status")
            setInputStatus("invalid");
        } else {
            console.log("empty input status")
            setInputStatus("empty");
        }
        propertyErrors && setErrors(propertyErrors);
        onChange(property);
    }, [instanceRef, onChange, property, validator, value])



    const handleLoseFocus = () => { onChange(property) };
    const statusColor = inputStatusColorMap[inputStatus];
    return <>
        <AppItem>
            <AppLabel position="stacked" color={statusColor} >
                {propertyFormattedName}
            </AppLabel>
            {input === "line" ?
                <AppInput onLoseFocus={handleLoseFocus} value={value} placeholder={propertyFormattedName} onInputChange={(val) => { setValue(val) }} />
                : <AppTextArea onLoseFocus={handleLoseFocus} value={value} onTextChange={(val) => {
                    console.log("text changed");
                    setValue(val);
                }} />}
        </AppItem>
        {errors && errors.length > 0 && <AppItem>
            <AppLabel position='stacked' color='danger'>
                {errors.map((error, i) => <AppText key={i}>
                    {error.message}
                </AppText>)}
            </AppLabel>
        </AppItem>}
    </>
}

export default AppFormInput;