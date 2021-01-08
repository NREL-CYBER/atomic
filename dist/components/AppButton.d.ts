import React from 'react';
import { AppColor } from '../theme/AppColor';
export declare type AppFill = "clear" | "outline" | "solid" | "default" | undefined;
interface buttonProps {
    expand?: "full" | "block";
    routerLink?: string;
    color?: AppColor;
    onClick?: () => void;
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
