import React, { useState } from 'react';
import { AppButtons } from '.';
import titleCase from '../util/titleCase';
import { InputStatus, inputStatusColorMap } from './AppFormInput';
import AppItem from './AppItem';
import AppLabel from './AppLabel';
import AppSelectButtons from './AppSelectButtons';
import AppText from './AppText';
import { formElementProps } from './forms/AppForm';



/**
 * Component for toggle that displays validation errors
 */
const AppFormToggle = (props: formElementProps) => {
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
            <AppSelectButtons selected={typeof checked === "undefined" ? [] : checked ? ["true"] : ["false"]} onSelectionChange={(selection) => {
                const isChecked = selection.includes("true");
                selection.length > 0 && setChecked(isChecked);
                onChange(property, isChecked).then(([validationStatus, validationErrors]) => {
                    setInputStatus(validationStatus);
                    setErrors(validationErrors);
                });
            }} buttons={[{
                color: "success",
                text: "True", value: "true"
            }, {
                color: "danger",
                text: "False", value: "false"
            }]} />
        </AppButtons>
        <AppLabel position='stacked' color='danger'>
            {errors && errors.map(error => <AppText>
                {error}
            </AppText>)}
        </AppLabel>
    </AppItem >
}

export default AppFormToggle;
