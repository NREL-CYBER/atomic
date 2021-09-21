import { AppButtons } from 'atomic';
import { STATUS_CODES } from 'http';
import React, { useCallback, useState } from 'react';
import { AppSelectArray } from '.';
import { prettyTitle } from '../util';
import AppButton from './AppButton';
import { InputStatus, inputStatusColorMap } from './AppFormInput';
import AppItem from './AppItem';
import AppLabel from './AppLabel';
import AppSelectOption from './AppSelectOption';
import AppText from './AppText';
import { formElementProps } from './forms/AppForm';
import { AppFormErrorsItem } from './forms/AppFormErrorsItem';
import { AppFormLabel } from './forms/AppFormLabel';


export interface formSelectArrayInputProps extends formElementProps {
    propertyInfo: { title: string, description: string, enum: string[] }
    multiple?: boolean
}


/**
 * Component for input that displays validation errors
 */
const AppFormSelectArray = (props: formSelectArrayInputProps) => {
    const { propertyInfo, instanceRef, onChange, property, multiple } = props;
    const [errors, setErrors] = useState<string[] | undefined>(undefined);
    const [inputStatus, setInputStatus] = useState<InputStatus>("empty");
    let instanceValue = instanceRef.current && (instanceRef.current as any)[property];
    if (typeof instanceValue === "undefined") {
        instanceRef.current[property] = [];
    }
    const [value, setValue] = useState<string[]>(instanceRef.current[property]);
    const propertyFormattedName = prettyTitle(propertyInfo.title ? propertyInfo.title : property);
    const inputStatusColor = inputStatusColorMap[inputStatus];

    const updateSelection = useCallback((val: string[]) => {
        setValue(val);
        if (typeof val === "undefined" || val === null) {
            setInputStatus("empty");
            return;
        }
        onChange(property, val).then(([validationStatus, validationErrors]) => {
            setInputStatus(validationStatus);
            setErrors(validationErrors);
        });
    }, [onChange, property])


    return <AppItem>
        <AppFormLabel color={inputStatusColor} name={propertyFormattedName} />
        <AppSelectArray multiple={multiple} value={value} placeholder={propertyFormattedName} onSelectionChange={(selection) => {
            updateSelection(selection);
        }}>
            {propertyInfo.enum.map((enumValue: string) => < AppSelectOption key={enumValue} value={enumValue} children={prettyTitle(enumValue)} />)}
        </AppSelectArray>
        <AppFormErrorsItem errors={errors} />
    </AppItem>
}

export default AppFormSelectArray;
