import { IonButton, IonBadge } from '@ionic/react';
import React from 'react';
import AppRoute from 'core/routing/AppRoute';
import { AppColor } from './AppCard';

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