/* eslint-disable react-hooks/exhaustive-deps */
import { IonLabel, IonRange } from '@ionic/react';
import React, { MutableRefObject, useMemo, useState } from 'react';
import { PropertyDefinitionRef } from 'validator';
import { AppItem, AppLabel, AppText } from '..';
import { prettyTitle } from '../../util';
import { InputStatus, inputStatusColorMap } from '../AppFormInput';
import { formFieldChangeEvent } from './AppForm';


interface formInputProps {
    propertyInfo: PropertyDefinitionRef
    property: string
    instanceRef: MutableRefObject<any>
    onChange: formFieldChangeEvent
}


/**
 * Component for input that displays validation errors
 */
const AppFormNumber = (props: formInputProps) => {
    const { property, instanceRef, onChange, propertyInfo } = props;
    const [errors, setErrors] = useState<string[]>([]);
    const [inputStatus, setInputStatus] = useState<InputStatus>("empty");
    const [value, setValue] = useState<number>((instanceRef.current && (instanceRef.current as any)[property]) || 0)
    const propertyFormattedName = prettyTitle(propertyInfo.title || property);

    const statusColor = inputStatusColorMap[inputStatus];
    const max = (propertyInfo as any).maximum || 1;
    const min = (propertyInfo as any).minimum || 0;
    return <>
        <AppItem color="clear" lines="none">
            <AppLabel color={statusColor} >
                {propertyFormattedName}
            </AppLabel>
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

        {useMemo(() => errors && errors.length > 0 && <AppItem>
            <AppLabel position='stacked' color='danger'>
                {errors.map((error, i) => <AppText key={i}>
                    {error}
                </AppText>)}
            </AppLabel>
        </AppItem>, [errors])}
    </>
}

export default AppFormNumber;