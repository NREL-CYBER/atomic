/* eslint-disable react-hooks/exhaustive-deps */
import { IonLabel, IonRange } from '@ionic/react';
import React, { useState } from 'react';
import { AppItem } from '..';
import { prettyTitle } from '../../util';
import { InputStatus, inputStatusColorMap } from '../AppFormInput';
import { formElementProps } from './AppForm';
import { AppFormErrorsItem } from './AppFormErrorsItem';
import { AppFormLabel } from './AppFormLabel';




/**
 * Component for input that displays validation errors
 */
const AppFormNumber = (props: formElementProps) => {
    const { property, instanceRef, onChange, propertyInfo, required } = props;
    const [errors, setErrors] = useState<string[]>([]);
    const [inputStatus, setInputStatus] = useState<InputStatus>("empty");
    const [value, setValue] = useState<number>((instanceRef.current && (instanceRef.current as any)[property]) || 0)
    const propertyFormattedName = prettyTitle(propertyInfo.title || property);

    const statusColor = inputStatusColorMap[inputStatus];
    const max = (propertyInfo as any).maximum || 1;
    const min = (propertyInfo as any).minimum || 0;
    return <>
        <AppItem color="clear" lines="none">
                <AppFormLabel required={required} name={propertyFormattedName} color={statusColor} />
            <IonRange value={value * 1000 * (max - min)} max={1000} min={0} onIonChange={(v) => {
                const scaledValue = (v.detail.value as number / 1000) * (max - min)
                onChange(property, scaledValue).then(([validationStatus, validationErrors]) => {
                    setValue(scaledValue);
                    setInputStatus(validationStatus);
                    setErrors(validationErrors || []);
                });

            }} >
                <IonLabel slot="start">{min}</IonLabel>
                <IonLabel slot="end">{max}</IonLabel>
            </IonRange>
        </AppItem>
        <AppFormErrorsItem errors={errors} />
    </>
}

export default AppFormNumber;