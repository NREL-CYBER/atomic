/* eslint-disable react-hooks/exhaustive-deps */
import React, { MutableRefObject, useEffect, useMemo, useState } from 'react';
import { PropertyDefinitionRef } from 'validator';
import { AppItem } from '..';
import { prettyTitle } from '../../util';
import { InputStatus, inputStatusColorMap } from '../AppFormInput';
import AppInput from '../AppInput';
import { formFieldChangeEvent } from './AppForm';
import { AppFormErrorsItem } from './AppFormErrorsItem';
import { AppFormLabel } from './AppFormLabel';


interface formInputProps {
    propertyInfo: PropertyDefinitionRef
    property: string
    instanceRef: MutableRefObject<any>
    onChange: formFieldChangeEvent
    required?: boolean
}


/**
 * Component for input that displays validation errors
 */
const AppFormInteger = (props: formInputProps) => {
    const { property, instanceRef, onChange, propertyInfo, required } = props;
    const [errors, setErrors] = useState<string[]>([]);
    const [inputStatus, setInputStatus] = useState<InputStatus>("empty");
    const [value, setValue] = useState<string>((instanceRef.current && (instanceRef.current as any)[property]) || null)
    const propertyFormattedName = prettyTitle(propertyInfo.title || property);

    useEffect(() => {
        if (value === null) {
            return;
        }
        const formValue = value === "" ? "0" : value;
        onChange(property, formValue ? parseInt(formValue) : 0).then(([validationStatus, validationErrors]) => {
            console.log(validationStatus);
            console.log(validationErrors);
            setInputStatus(validationStatus);
            setErrors(validationErrors || []);
        });
    }, [onChange, property, value])

    const statusColor = inputStatusColorMap[inputStatus];
    return <>
        <AppItem color="clear" lines="none">
            <AppFormLabel required={required} name={propertyFormattedName} color={statusColor} />

            {useMemo(() => <AppInput min={(propertyInfo as any)?.minumum} max={(propertyInfo as any)?.maximum} type={"number"} value={value} placeholder={propertyFormattedName} onInputChange={(val) => {
                setValue(val)
            }} />, [])}
        </AppItem>

        <AppFormErrorsItem errors={errors} />
    </>
}

export default AppFormInteger;