import { IonText } from '@ionic/react';
import React from 'react';
import { AppColor } from './AppCard';


interface textProps {
    className?: string
    color?: AppColor
}

/**
 * Component to display text with optional color
 */
const AppText: React.FC<textProps> = (props) => {
    return <IonText {...props} />
};
export default AppText;