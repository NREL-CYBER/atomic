import { ErrorObject } from 'ajv';
import Validator from 'validator';
import React, { MutableRefObject, useEffect, useState } from 'react';
import titleCase from '../util/titleCase';
import { v4 as uuidv4 } from "uuid";
import AppButtons from './AppButtons';
import { AppColor } from '../theme/AppColor';
import AppChip from './AppChip';
import AppCol from './AppCol';
import AppItem from './AppItem';
import AppLabel from './AppLabel';
import AppText from './AppText';

interface formInputProps<T> {
    instanceRef: MutableRefObject<any>
    validator: Validator<T>
}

type InputStatus = "empty" | "invalid" | "valid";

const inputStatusColorMap: Record<InputStatus, AppColor> = { empty: "dark", valid: "favorite", invalid: "danger" }

/**
 * Component for input that displays validation errors
 */
const AppUuidGenerator = (props: formInputProps<any>) => {
    const { instanceRef, validator } = props;
    const property = "uuid";
    if (instanceRef.current.uuid === undefined) {
        instanceRef.current.uuid = uuidv4();
    }
    const [errors, setErrors] = useState<ErrorObject[]>([]);
    const [inputStatus, setInputStatus] = useState<InputStatus>("empty");
    const [value] = useState<string>((instanceRef.current && (instanceRef.current as any)[property]) || "")

    const propertyFormattedName = titleCase(property);

    useEffect(() => {
        const change: Record<string, string> = {}
        change[property] = value
        instanceRef.current = { ...instanceRef.current, ...change }
        validator.validate(instanceRef.current)
        const allErrors = validator.validate.errors || []
        const propertyErrors = allErrors.filter(error => error.message && error.message.includes(property))
        if (propertyErrors.length === 0 && value) {
            setInputStatus("valid");
        } else if (value) {
            setInputStatus("invalid");
        } else {
            setInputStatus("empty");
        }
        setErrors(propertyErrors);
    }, [instanceRef, validator, value])


    const inputStatusColor = inputStatusColorMap[inputStatus];

    return <AppItem>
        <AppButtons slot="start">
            <AppLabel position="stacked" color={inputStatusColor} >
                <AppCol>
                    {propertyFormattedName}
                </AppCol>
                <AppCol>
                    <AppChip color={"medium"} >{value}</AppChip>
                </AppCol>
            </AppLabel>
        </AppButtons>
        <AppLabel position='stacked' color='danger'>
            {errors && errors.map(error => <AppText>
                {error.message}
            </AppText>)}
        </AppLabel>
    </AppItem>
}

export default AppUuidGenerator;