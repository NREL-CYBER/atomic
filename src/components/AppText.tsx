import { IonText } from '@ionic/react';
import React from 'react';
import { AppColor } from '../theme/AppColor';


interface textProps {
    className?: string
    color?: AppColor,
    style?: Record<string, any>
    onBlur?: () => void
}

/**
 * Component to display text with optional color
 */
const AppText: React.FC<textProps> = (props) => {
    return <IonText {...props} />
};
export default AppText;