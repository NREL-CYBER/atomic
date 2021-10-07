import React, { useEffect, useState } from 'react';
import { AppItem } from '..';
import { prettyTitle } from '../../util';
import { AppDateTime, dateTimeFormat } from '../AppDateTime';
import { InputStatus, inputStatusColorMap } from '../AppFormInput';
import { formElementProps } from './AppForm';
import { AppFormErrorsItem } from './AppFormErrorsItem';
import { AppFormLabel } from './AppFormLabel';

interface formDateTimePickerProps extends formElementProps {
    format?: string
}


/**
 * Component for input that displays validation errors
 */
const AppFormDateTimePicker = (props: formDateTimePickerProps) => {
    const { property, instanceRef, onChange, propertyInfo, format = "date", required } = props;
    const [errors, setErrors] = useState<string[]>([]);
    const [inputStatus, setInputStatus] = useState<InputStatus>(typeof (instanceRef.current && (instanceRef.current as any)[property]) === "undefined"?"empty":"valid");
    const [value, setValue] = useState<string>((instanceRef.current && (instanceRef.current as any)[property]) || null)
    const propertyFormattedName = prettyTitle(propertyInfo.title || property);

    useEffect(() => {
        if (value === null) {
            return;
        }
        onChange(property, value).then(([validationStatus, validationErrors]) => {
            setInputStatus(validationStatus);
            setErrors(validationErrors || []);
        });
    }, [onChange, property, value])

    const statusColor = inputStatusColorMap[inputStatus];

    const dateTimeFormat: dateTimeFormat = format === "date-time" ? "YYYY-MM-DDThh:mm:ssZ" : "YYYY-MM-DD"
    return <>
        <AppItem color="clear" lines="none">

            <AppFormLabel name={propertyFormattedName} required={required} color={statusColor} />
            <AppDateTime displayFormat={dateTimeFormat} pickerFormat={dateTimeFormat} value={value} onDateEntered={(val) => {
                format === "date-time" ?
                    setValue(val) : setValue(val.split("T")[0])

            }} />
        </AppItem>
        <AppFormErrorsItem errors={errors} />
    </>
}

export default AppFormDateTimePicker;