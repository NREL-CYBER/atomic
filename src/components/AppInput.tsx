/* eslint-disable react-hooks/rules-of-hooks */
import { IonInput } from '@ionic/react';
import React from 'react';
import { AppColor } from '../theme/AppColor';

export type stringFormat = "number" | "time" | "text" | "date" | "email" | "password" | "search" | "tel" | "url" | "week" | "month" | "datetime-local" | undefined;

interface inputProps {
    onInputChange?: (value: string) => void
    onInputBlur?: (value: string) => void
    placeholder?: string
    value?: string
    color?: AppColor
    type?: stringFormat
    style?: Record<string, any>
    debounce?: number
}

/**
 * Component for text input
 */
const AppInput: React.FC<inputProps> = (props) => {
    return <IonInput onIonBlur={({ target }) => { props.onInputBlur && props.onInputBlur((target as any).value) }} debounce={props.debounce || 200} {...props} onIonChange={({ detail }) => { props.onInputChange && props.onInputChange(detail.value!) }} />
}
export default AppInput;