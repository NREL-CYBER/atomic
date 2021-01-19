/* eslint-disable react-hooks/rules-of-hooks */
import { IonInput } from '@ionic/react';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { AppColor } from '..';


interface inputProps {
    onInputChange?: (value: string) => void
    placeholder: string
    value?: string
    onLoseFocus?: () => void
    color?: AppColor
}

/**
 * Component for text input
 */
const AppInput: React.FC<inputProps> = (props) => {
    const { onLoseFocus } = props;
    const handleKeyUp = onLoseFocus ? useDebouncedCallback(onLoseFocus, 1000).callback : () => { }

    return <IonInput onKeyUp={handleKeyUp} {...props} onIonChange={(e) => { props.onInputChange && props.onInputChange(e.detail.value!) }} />
}
export default AppInput;