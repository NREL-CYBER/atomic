import React, { MutableRefObject, useState } from 'react';
import { AppColor } from '../theme/AppColor';
import titleCase from '../util/titleCase';
import AppItem from './AppItem';
import AppLabel from './AppLabel';
import AppSelect from './AppSelect';
import AppSelectOption from './AppSelectOption';
import AppText from './AppText';
import { formFieldChangeEvent } from './forms/AppForm';
import { prettyTitle } from '../util';
import useTimeout from 'use-timeout';


interface formInputProps<T> {
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
const AppFormSelect = (props: formInputProps<any>) => {
    const { propertyInfo, instanceRef, onChange, property } = props;
    const [errors, setErrors] = useState<string[] | undefined>(undefined);
    const [inputStatus, setInputStatus] = useState<InputStatus>("empty");
    const instanceValue = instanceRef.current ? (instanceRef.current as any)[property] : ""
    const [value, setValue] = useState<string>(instanceValue);
    const propertyFormattedName = prettyTitle(propertyInfo.title ? propertyInfo.title : property);

    const inputStatusColor = inputStatusColorMap[inputStatus];
    return <AppItem>
        <AppLabel position="stacked" color={inputStatusColor} >
            {propertyFormattedName}
        </AppLabel>
        <AppSelect interface="popover" value={value} placeholder={propertyFormattedName} onSelectionChange={(val) => {
            const [validationStatus, validationErrors] = onChange(property, val);
            setInputStatus(validationStatus);
            setErrors(validationErrors);
            setTimeout(() => {
                setValue(value);
            }, 0);
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
