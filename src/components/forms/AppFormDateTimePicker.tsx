import React, { MutableRefObject, useEffect, useState } from 'react';
import { PropertyDefinitionRef } from 'validator';
import { AppItem, AppLabel, AppText } from '..';
import { AppColor } from '../../theme';
import { prettyTitle } from '../../util';
import { AppDateTime, dateTimeFormat } from '../AppDateTime';
import { formFieldChangeEvent } from './AppForm';

interface formInputProps {
    propertyInfo: PropertyDefinitionRef
    property: string
    instanceRef: MutableRefObject<any>
    onChange: formFieldChangeEvent
    format?: string
}

type InputStatus = "empty" | "invalid" | "valid";

const inputStatusColorMap: Record<InputStatus, AppColor> = { empty: "medium", valid: "favorite", invalid: "danger" };


/**
 * Component for input that displays validation errors
 */
const AppFormDateTimePicker = (props: formInputProps) => {
    const { property, instanceRef, onChange, propertyInfo, format = "date" } = props;
    const [errors, setErrors] = useState<string[]>([]);
    const [inputStatus, setInputStatus] = useState<InputStatus>("empty");
    const [value, setValue] = useState<string>((instanceRef.current && (instanceRef.current as any)[property]) || null)
    const propertyFormattedName = prettyTitle(propertyInfo.title || property);

    useEffect(() => {
        if (value === null) {
            return;
        }
        const [validationStatus, validationErrors] = onChange(property, value);
        setInputStatus(validationStatus);
        setErrors(validationErrors || []);
    }, [onChange, property, value])

    const statusColor = inputStatusColorMap[inputStatus];

    const dateTimeFormat: dateTimeFormat = format === "date-time" ? undefined : "YYYY-MM-DD"
    return <>
        <AppItem color="clear" lines="none">
            <AppLabel position="stacked" color={statusColor} >
                {propertyFormattedName}
            </AppLabel>
            <AppDateTime displayFormat={dateTimeFormat} pickerFormat={dateTimeFormat} value={value} onDateEntered={(val) => {
                format === "date-time" ?
                    setValue(val) : setValue(val.split("T")[0])

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

export default AppFormDateTimePicker;