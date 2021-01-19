import { ErrorObject } from 'ajv';
import React, { MutableRefObject, useEffect, useState } from 'react';
import validator from 'validator';
import { AppColor } from '../theme/AppColor';
import titleCase from '../util/titleCase';
import AppItem from './AppItem';
import AppLabel from './AppLabel';
import AppSelect from './AppSelect';
import AppSelectOption from './AppSelectOption';
import AppText from './AppText';


interface formInputProps<T> {
    property: string,
    propertyInfo: { title: string, description: string, enum: string[] }
    instanceRef: MutableRefObject<any>
    validator: validator<T>
    onValid: (property: string) => void
}

type InputStatus = "empty" | "invalid" | "valid";

const inputStatusColorMap: Record<InputStatus, AppColor> = { empty: "dark", valid: "favorite", invalid: "danger" }

/**
 * Component for input that displays validation errors
 */
const AppFormSelect = (props: formInputProps<any>) => {
    const { propertyInfo, instanceRef, validator, onValid, property } = props;
    const [errors, setErrors] = useState<ErrorObject[]>([]);
    const [inputStatus, setInputStatus] = useState<InputStatus>("empty");
    const [value, setValue] = useState<string>((instanceRef.current && (instanceRef.current as any)[property]) || "")

    const propertyFormattedName = titleCase(propertyInfo.title);

    useEffect(() => {
        const change = { [property]: value };
        instanceRef.current = { ...instanceRef.current, ...change }
        validator.validate(instanceRef.current)
        const allErrors = validator.validate.errors || []
        const propertyErrors = allErrors.filter(error => error.message && error.message.includes(property))
        if (propertyErrors.length === 0 && value) {
            setInputStatus("valid");
            onValid(property);
            setErrors([]);
            return;
        } else if (value) {
            setInputStatus("invalid");
        } else {
            setInputStatus("empty");
        }
        setErrors(propertyErrors);
    }, [instanceRef, onValid, property, validator, value, validator.validate.errors])


    const inputStatusColor = inputStatusColorMap[inputStatus];
    return <AppItem>
        <AppLabel position="stacked" color={inputStatusColor} >
            {propertyFormattedName}
        </AppLabel>
        <AppSelect interface="popover" value={value} placeholder={propertyFormattedName} onSelectionChange={(val) => { setValue(val) }}>
            {propertyInfo.enum.map((enumValue: string) => < AppSelectOption key={enumValue} value={enumValue} children={titleCase(enumValue)} />)}
        </AppSelect>
        <AppLabel position='stacked' color='danger'>
            {errors && errors.map(error => <AppText>
                {error.message}
            </AppText>)}
        </AppLabel>
    </AppItem>
}

export default AppFormSelect;
