import { RangeValue } from '@ionic/core';
import { IonRange } from '@ionic/react';
import React from 'react';
import { isNumber } from '../util';


interface rangeProps {
    min: number
    max: number
    pin?: boolean
    value: RangeValue
    onValueChange?: (value: number) => {

    },
    onRangeChange?: (value: { lower: number, upper: number }) => {

    }
}

/**
 * Range Slider component, behaves like you expect!
 */
const AppRange: React.FC<rangeProps> = (props) =>
    <IonRange onIonChange={(e) => {
        if (isNumber(e.detail.value)) {
            props.onValueChange && props.onValueChange(e.detail.value as number)
        } else {
            props.onRangeChange && props.onRangeChange(e.detail.value as any)
        }
    }} {...props} />

export default AppRange;