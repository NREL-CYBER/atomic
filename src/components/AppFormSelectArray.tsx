import React, { MutableRefObject, useState, useCallback } from 'react';
import { AppSelectArray } from '.';
import { AppColor } from '../theme/AppColor';
import { prettyTitle } from '../util';
import AppItem from './AppItem';
import AppLabel from './AppLabel';
import AppSelectOption from './AppSelectOption';
import AppText from './AppText';
import { formFieldChangeEvent } from './forms/AppForm';
import { useEffect } from 'react';


export interface formSelectArrayInputProps {
    property: string,
    propertyInfo: { title: string, description: string, enum: string[] }
    instanceRef: MutableRefObject<any>
    onChange: formFieldChangeEvent
    multiple?: boolean
}

type InputStatus = "empty" | "invalid" | "valid";

const inputStatusColorMap: Record<InputStatus, AppColor> = { empty: "dark", valid: "favorite", invalid: "danger" }

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
        if (typeof val === "undefined" || val === null) {
            setInputStatus("empty");
            return;
        }

        const [validationStatus, validationErrors] = onChange(property, val);
        setInputStatus(validationStatus);
        setErrors(validationErrors);
    }, [onChange, property])

    useEffect(() => {
        updateSelection(value)
    }, [updateSelection, value])


    return <AppItem>
        <AppLabel position="stacked" color={inputStatusColor} >
            {propertyFormattedName}
        </AppLabel>
        <AppSelectArray multiple={multiple} value={value} placeholder={propertyFormattedName} onSelectionChange={(selection) => {
            setValue(selection);
        }}>
            {propertyInfo.enum.map((enumValue: string) => < AppSelectOption key={enumValue} value={enumValue} children={prettyTitle(enumValue)} />)}
        </AppSelectArray>
        <AppLabel position='stacked' color='danger'>
            {errors && errors.map(error => <AppText>
                {error}
            </AppText>)}
        </AppLabel>
    </AppItem>
}

export default AppFormSelectArray;
