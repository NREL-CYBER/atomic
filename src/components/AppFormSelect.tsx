import { AppCol } from 'atomic';
import { isArray } from 'lodash';
import React, { MutableRefObject, useState } from 'react';
import { prettyTitle } from '../util';
import { InputStatus, inputStatusColorMap } from './AppFormInput';
import AppItem from './AppItem';
import AppSelectButtons from './AppSelectButtons';
import { formFieldChangeEvent } from './forms/AppForm';
import { AppFormErrorsItem } from './forms/AppFormErrorsItem';
import { AppFormLabel } from './forms/AppFormLabel';


export interface formSelectInputProps {
    property: string,
    propertyInfo: { title: string, description: string, enum: string[] }
    instanceRef: MutableRefObject<any>
    required?: boolean,
    onChange: formFieldChangeEvent
    context?: any
}

/**
 * Component for input that displays validation errors
 */
const AppFormSelect = (props: formSelectInputProps) => {
    const { propertyInfo, instanceRef, onChange, property, required, context } = props;
    const [errors, setErrors] = useState<string[] | undefined>(undefined);
    const [inputStatus, setInputStatus] = useState<InputStatus>(instanceRef.current && typeof instanceRef.current[property] === "undefined" ? "empty" : "valid");
    let instanceValue = instanceRef.current && (instanceRef.current as any)[property];
    const [value, setValue] = useState<string>(instanceValue);
    const propertyFormattedName = prettyTitle(propertyInfo.title ? propertyInfo.title : property);
    const statusColor = inputStatusColorMap[inputStatus];
    let options = propertyInfo.enum;
    if (context && isArray(context) && context.length > 0 && context[0] === "string") {
        options = options.filter(x => !context.includes(x))
    }
    return <>
        <AppItem >
            <AppFormLabel required={required}
                name={propertyFormattedName}
                color={statusColor} />
            <AppCol>

                <AppSelectButtons display={"vertical"} segment selected={[value]} onSelectionChange={([val]) => {
                    setValue(val);
                    onChange(property, val).then(([validationStatus, validationErrors]) => {
                        setInputStatus(validationStatus);
                        setErrors(validationErrors);
                    });
                }} buttons={
                    options.map((enumValue: string) => ({ fill: "clear", color: value === enumValue ? "primary" : "medium", value: enumValue, text: prettyTitle(enumValue) }))
                } />
            </AppCol>
        </AppItem>
        <AppFormErrorsItem errors={errors} />
    </>
}

export default AppFormSelect;
