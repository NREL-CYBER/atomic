import { IonButton } from '@ionic/react';
import React from 'react';
import { AppColor } from '../theme/AppColor';

export type AppFill = "clear" | "outline" | "solid" | "default" | undefined


interface buttonProps {
    expand?: "full" | "block"
    routerLink?: string
    color?: AppColor
    onClick?: () => void
    fill?: AppFill
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