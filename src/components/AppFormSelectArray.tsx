import React, { MutableRefObject, useState } from 'react';
import { AppSelectArray } from '.';
import { AppColor } from '../theme/AppColor';
import { prettyTitle } from '../util';
import AppItem from './AppItem';
import AppLabel from './AppLabel';
import AppSelectOption from './AppSelectOption';
import AppText from './AppText';
import { formFieldChangeEvent } from './forms/AppForm';


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
    const [value, setValue] = useState<string[]>(instanceValue);
    const propertyFormattedName = prettyTitle(propertyInfo.title ? propertyInfo.title : property);

    const inputStatusColor = inputStatusColorMap[inputStatus];
    return <AppItem>
        <AppLabel position="stacked" color={inputStatusColor} >
            {propertyFormattedName}
        </AppLabel>
        <AppSelectArray multiple={multiple} value={value} placeholder={propertyFormattedName} onSelectionChange={(val) => {
            if (typeof val === "undefined") {
                val = [];
            }
            const [validationStatus, validationErrors] = onChange(property, val);
            setInputStatus(validationStatus);
            setErrors(validationErrors);
            setValue(value);
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
