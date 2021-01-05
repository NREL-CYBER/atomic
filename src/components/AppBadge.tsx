import { IonBadge } from '@ionic/react';
import React from 'react';
import { AppColor } from '../theme/AppColor';

export type CyberAppFill = "clear" | "outline" | "solid" | "default" | undefined


interface badgeProps {
    color?: AppColor
    className?: string
}

/**
 * Button Component 
 */
const AppBadge: React.FC<badgeProps> = (props) => {
    return <IonBadge  {...props} />
};
export default AppBadge;