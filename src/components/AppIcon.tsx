import { IonIcon } from '@ionic/react';
import React from 'react';
import { AppColor } from '../theme/AppColor';


interface iconProps {
    slot?: "start" | "end"
    icon: string
    size?: "large" | "small"
    color?: AppColor
}

/**
 * Component to display an icon
 */
const AppIcon: React.FC<iconProps> = (props) =>
    <IonIcon {...props} />

export default AppIcon;