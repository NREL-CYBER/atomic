import React, { MutableRefObject, useState } from 'react';
import { AppColor } from '../theme/AppColor';
import { prettyTitle } from '../util';
import titleCase from '../util/titleCase';
import AppItem from './AppItem';
import AppLabel from './AppLabel';
import AppSelectOption from './AppSelectOption';
import AppSelect from './AppSelect';
import AppText from './AppText';
import { formFieldChangeEvent } from './forms/AppForm';
import { useEffect, useCallback } from 'react';


export interface formSelectInputProps {
    property: string,
    propertyInfo: { title: string, description: string, enum: string[] }
    instanceRef: MutableRefObject<any>
    onChange: formFieldChangeEvent
}

type InputStatus = "empty" | "invalid" | "valid";

const inputStatusColorMap: Record<InputStatus, AppColor> = { empty: "dark", valid: "favorite", invalid: "danger" }

/**
 * Component for input that displays validation errors
 */
const AppFormSelect = (props: formSelectInputProps) => {
    const { propertyInfo, instanceRef, onChange, property } = props;
    const [errors, setErrors] = useState<string[] | undefined>(undefined);
    const [inputStatus, setInputStatus] = useState<InputStatus>("empty");
    let instanceValue = instanceRef.current && (instanceRef.current as any)[property];
    if (typeof instanceValue === "undefined") {
        instanceRef.current[property] = "";
    }
    const [value, setValue] = useState<string>(instanceValue);
    const propertyFormattedName = prettyTitle(propertyInfo.title ? propertyInfo.title : property);

    const inputStatusColor = inputStatusColorMap[inputStatus];

    const updateSelection = useCallback((val: string) => {
        if (val === "" || typeof val === "undefined" || val === null) {
            setInputStatus("empty");
            return;
        }
        const [validationStatus, validationErrors] = onChange(property, val);
        setInputStatus(validationStatus);
        setErrors(validationErrors);
        setValue(value);
    }, [onChange, property, value]);

    useEffect(() => {
        updateSelection(value);
    }, [updateSelection, value])



    return <AppItem>
        <AppLabel position="stacked" color={inputStatusColor} >
            {propertyFormattedName}
        </AppLabel>
        <AppSelect interface="popover" value={value} placeholder={propertyFormattedName} onSelectionChange={(selection) => {
            setValue(selection);
        }}>
            {propertyInfo.enum.map((enumValue: string) => < AppSelectOption key={enumValue} value={enumValue} children={titleCase(enumValue)} />)}
        </AppSelect>
        <AppLabel position='stacked' color='danger'>
            {errors && errors.map(error => <AppText>
                {error}
            </AppText>)}
        </AppLabel>
    </AppItem>
}

export default AppFormSelect;
