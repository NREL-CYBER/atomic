import { IonTextarea } from '@ionic/react';
import React from 'react';
import { AppColor } from '../theme/AppColor';
import { useDebouncedCallback } from 'use-debounce';


interface textProps {
    className?: string
    color?: AppColor
    onTextChange: (value: string) => void
    value: string
    onLoseFocus?: () => void

}

/**
 * Component to display text with optional color
 */
const AppTextArea: React.FC<textProps> = (props) => {
    let { onLoseFocus, onTextChange } = props;
    if (typeof onLoseFocus === 'undefined') {
        onLoseFocus = () => { console.log("unhandled focus event"); }
    }
    const handleKeyUp = useDebouncedCallback(onLoseFocus, 1000).callback;
    const handleChange = onTextChange ? (val: string) => onTextChange(val) : (val: string) => { console.log("unhandled change event") }
    return <IonTextarea
        onKeyUp={handleKeyUp}
        onIonChange={(event) => { handleChange(event.detail.value!) }} {...props} />
};
export default AppTextArea;