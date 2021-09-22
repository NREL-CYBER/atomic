import { IonButton } from '@ionic/react';
import React, { MouseEventHandler } from 'react';
import { AppColor } from '../theme/AppColor';

export type AppFill = "clear" | "outline" | "solid" | "default" | undefined


export interface buttonProps {
    expand?: "full" | "block"
    routerLink?: string
    color?: AppColor
    className?: string
    onClick?: MouseEventHandler
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
    return <IonButton   {...props} />
};
export default AppButton;