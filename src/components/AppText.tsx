import { IonText } from '@ionic/react';
import React from 'react';
import { CSSProperties } from 'react';
import { AppColor } from '../theme/AppColor';


interface textProps {
    className?: string
    color?: AppColor,
    style?: CSSProperties
    size?: number
    onBlur?: () => void
}

/**
 * Component to display text with optional color
 */
const AppText: React.FC<textProps> = (props) => {
    return <IonText style={props.size ? { ...props.style, fontSize: props.size + "px" } : props.style}  {...props} />
};
export default AppText;