import { IonButton } from '@ionic/react';
import React from 'react';
import AppRoute from 'core/routing/AppRoute';
import { AppColor } from './AppCard';

export type CyberAppFill = "clear" | "outline" | "solid" | "default" | undefined


interface buttonProps {
    expand?: "full" | "block"
    routerLink?: string
    color?: AppColor
    onClick?: () => void
    fill?: CyberAppFill
    disabled?: boolean
    routerDirection?: "forward" | "back" | "none" | "root"
    onMouseEnter?: () => void
    onMouseExit?: () => void
}

/**
 * Button Component 
 */
const AppButton: React.FC<buttonProps> = (props) => {
    return <IonButton  {...props} />
};
export default AppButton;