import { IonButton } from '@ionic/react';
import React, { MouseEventHandler } from 'react';
import { AppColor, RogueColor, rogueColorToStyle } from '../theme/AppColor';

export type AppFill = "clear" | "outline" | "solid" | "default" | undefined


export interface buttonProps {
    expand?: "full" | "block"
    routerLink?: string
    color?: AppColor
    colorOverride?: RogueColor
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
    return <IonButton style={props.colorOverride ? rogueColorToStyle(props.colorOverride) : {}}  {...props} />
};
export default AppButton;