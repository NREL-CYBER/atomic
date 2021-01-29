import { IonTextarea } from '@ionic/react';
import React from 'react';
import { AppColor } from '../theme/AppColor';


interface textProps {
    className?: string
    color?: AppColor
    onTextChange: (value: string) => void
    value: string
    inputMode?: "text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | undefined
}

/**
 * Component to display text with optional color (onText change debounced by 500ms)
 */
const AppTextArea: React.FC<textProps> = ({ onTextChange, ...props }) => {
    return <IonTextarea
        debounce={500}
        onIonChange={(event) => { onTextChange(event.detail.value!) }} {...props} />
};
export default AppTextArea;