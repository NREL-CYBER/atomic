import { IonTextarea } from '@ionic/react';
import React from 'react';
import { AppColor } from '../theme/AppColor';


interface textProps {
    className?: string
    color?: AppColor
    onTextChange: (value: string) => void
    value: string
    placeholder?: string
    rows?: number
    inputMode?: "text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal" | "search"
}

/**
 * Component to display text with optional color (onText change debounced by 500ms)
 * if you want to use any other params feel free to add them in text props:
 * https://ionicframework.com/docs/api/textarea
 * As it says in ionic doc, this is not for inline children text, set the inner value by using the value param
 */
const AppTextArea: React.FC<textProps> = ({ onTextChange, rows = 2, ...props }) => {
    return <IonTextarea
        debounce={500}
        rows={rows}
        onIonChange={(event) => { onTextChange(event.detail.value!) }} {...props} />
};
export default AppTextArea;