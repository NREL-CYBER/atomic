import { AppCol } from 'atomic';
import React, { MutableRefObject, useCallback, useEffect, useState } from 'react';
import { isUndefined, prettyTitle } from '../util';
import titleCase from '../util/titleCase';
import { InputStatus, inputStatusColorMap } from './AppFormInput';
import AppItem from './AppItem';
import AppSelect from './AppSelect';
import AppSelectOption from './AppSelectOption';
import { formFieldChangeEvent } from './forms/AppForm';
import { AppFormErrorsItem } from './forms/AppFormErrorsItem';
import { AppFormLabel } from './forms/AppFormLabel';


export interface formSelectInputProps {
    property: string,
    propertyInfo: { title: string, description: string, enum: string[] }
    instanceRef: MutableRefObject<any>
    required?: boolean,
    onChange: formFieldChangeEvent
}

/**
 * Component for input that displays validation errors
 */
const AppFormSelect = (props: formSelectInputProps) => {
    const { propertyInfo, instanceRef, onChange, property, required } = props;
    const [errors, setErrors] = useState<string[] | undefined>(undefined);
    const [inputStatus, setInputStatus] = useState<InputStatus>(typeof instanceRef.current === "undefined" ? "empty" : "valid");
    let instanceValue = instanceRef.current && (instanceRef.current as any)[property];
    if (isUndefined(instanceValue)) {
        instanceRef.current[property] = "";
    }
    const [value, setValue] = useState<string>(instanceValue);
    const propertyFormattedName = prettyTitle(propertyInfo.title ? propertyInfo.title : property);

    const statusColor = inputStatusColorMap[inputStatus];

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



    return <>
        <AppItem>
            <AppFormLabel required={required}
                name={propertyFormattedName}
                color={statusColor} />
            <AppCol>

                <AppSelect interface="popover" value={value} placeholder={propertyFormattedName} onSelectionChange={(selection) => {
                    setValue(selection);
                }}>
                    {propertyInfo.enum.map((enumValue: string) => < AppSelectOption key={enumValue} value={enumValue} children={titleCase(enumValue)} />)}
                </AppSelect>
            </AppCol>
        </AppItem>
        <AppFormErrorsItem errors={errors} />
    </>
}

export default AppFormSelect;
