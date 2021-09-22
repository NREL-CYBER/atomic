import React, { MouseEventHandler } from 'react';
import { AppColor } from '../theme/AppColor';
export declare type AppFill = "clear" | "outline" | "solid" | "default" | undefined;
export interface buttonProps {
    expand?: "full" | "block";
    routerLink?: string;
    color?: AppColor;
    className?: string;
    onClick?: MouseEventHandler;
    fill?: AppFill;
    disabled?: boolean;
    routerDirection?: "forward" | "back" | "none" | "root";
    onMouseEnter?: () => void;
    onMouseExit?: () => void;
}
/**
 * Button Component
 */
declare const AppButton: React.FC<buttonProps>;
export default AppButton;
