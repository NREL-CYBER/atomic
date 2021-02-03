import React, { MutableRefObject, useState } from 'react';
import { PropertyDefinitionRef } from 'validator';
import { AppButtons, AppToggle } from '.';
import { AppColor } from '../theme/AppColor';
import titleCase from '../util/titleCase';
import AppItem from './AppItem';
import AppLabel from './AppLabel';
import AppText from './AppText';
import { formFieldChangeEvent } from './forms/AppForm';


interface formToggleProps<T> {
    property: string,
    propertyInfo: PropertyDefinitionRef
    instanceRef: MutableRefObject<T>
    onChange: formFieldChangeEvent
}

export type InputStatus = "empty" | "invalid" | "valid";

export const inputStatusColorMap: Record<InputStatus, AppColor> = { empty: "dark", valid: "favorite", invalid: "danger" }

/**
 * Component for toggle that displays validation errors
 */
const AppFormToggle = (props: formToggleProps<any>) => {
    const { propertyInfo, instanceRef, onChange, property } = props;
    const [errors, setErrors] = useState<string[] | undefined>(undefined);
    const [inputStatus, setInputStatus] = useState<InputStatus>("empty");
    const [checked, setChecked] = useState<boolean | undefined>((instanceRef.current && (instanceRef.current as any)[property]) || undefined)

    const propertyFormattedName = titleCase(propertyInfo.title ? propertyInfo.title : propertyInfo.description ? propertyInfo.description : property);

    const inputStatusColor = inputStatusColorMap[inputStatus];
    return <AppItem>
        <AppButtons slot="start">
            <AppLabel position="stacked" color={inputStatusColor} >
                {propertyFormattedName}
            </AppLabel>
            <AppToggle checked={checked} onToggleChange={(isChecked) => {
                setChecked(isChecked);
                const [validationStatus, validationErrors] = onChange(property, isChecked);
                setInputStatus(validationStatus);
                setErrors(validationErrors);
            }}>
            </AppToggle>
        </AppButtons>
        <AppLabel position='stacked' color='danger'>
            {errors && errors.map(error => <AppText>
                {error}
            </AppText>)}
        </AppLabel>
    </AppItem >
}

export default AppFormToggle;
