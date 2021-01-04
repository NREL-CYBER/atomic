import { IonTextarea } from '@ionic/react';
import React from 'react';
import { AppColor } from './AppCard';
import { useDebouncedCallback } from 'use-debounce';


interface textProps {
    className?: string
    color?: AppColor
    onTextChange?: (value: string) => void
    value: string
    onLoseFocus?: () => void

}

/**
 * Component to display text with optional color
 */
const AppTextArea: React.FC<textProps> = (props) => {
    const { onLoseFocus, onTextChange } = props;
    const handleKeyUp = onLoseFocus ? useDebouncedCallback(onLoseFocus, 1000).callback : () => { console.log("unhandled focus event") }
    const handleChange = onTextChange ? (val: string) => onTextChange(val) : (val: string) => { console.log("unhandled change event") }
    return <IonTextarea
        onKeyUp={handleKeyUp}
        onIonChange={(event) => { handleChange(event.detail.value!) }} {...props} />
};
export default AppTextArea;