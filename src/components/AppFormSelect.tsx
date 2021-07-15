import React, { MutableRefObject, useCallback, useEffect, useState } from 'react';
import { prettyTitle } from '../util';
import titleCase from '../util/titleCase';
import { InputStatus, inputStatusColorMap } from './AppFormInput';
import AppItem from './AppItem';
import AppLabel from './AppLabel';
import AppSelect from './AppSelect';
import AppSelectOption from './AppSelectOption';
import AppText from './AppText';
import { formFieldChangeEvent } from './forms/AppForm';


export interface formSelectInputProps {
    property: string,
    propertyInfo: { title: string, description: string, enum: string[] }
    instanceRef: MutableRefObject<any>
    onChange: formFieldChangeEvent
}

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
        onChange(property, val).then(([validationStatus, validationErrors]) => {
            setInputStatus(validationStatus);
            setErrors(validationErrors);
            setValue(value);
        });
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
