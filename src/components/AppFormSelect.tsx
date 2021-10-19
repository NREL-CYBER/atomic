import { AppCol } from 'atomic';
import React, { MutableRefObject, useState } from 'react';
import { prettyTitle } from '../util';
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
    const [inputStatus, setInputStatus] = useState<InputStatus>(typeof instanceRef.current[property] === "undefined" ? "empty" : "valid");
    let instanceValue = instanceRef.current && (instanceRef.current as any)[property];
    const [value, setValue] = useState<string>(instanceValue);
    const propertyFormattedName = prettyTitle(propertyInfo.title ? propertyInfo.title : property);
    const statusColor = inputStatusColorMap[inputStatus];
    return <>
        <AppItem>
            <AppFormLabel required={required}
                name={propertyFormattedName}
                color={statusColor} />
            <AppCol>

                <AppSelect interface="popover" value={value} placeholder={propertyFormattedName} onSelectionChange={(val) => {
                    setValue(val);
                    onChange(property, val).then(([validationStatus, validationErrors]) => {
                        setInputStatus(validationStatus);
                        setErrors(validationErrors);
                    });
                }}>
                    {propertyInfo.enum.map((enumValue: string) => < AppSelectOption key={enumValue} value={enumValue} children={titleCase(enumValue)} />)}
                </AppSelect>
            </AppCol>
        </AppItem>
        <AppFormErrorsItem errors={errors} />
    </>
}

export default AppFormSelect;
