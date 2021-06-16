import React from 'react';
import { AppColor } from '../theme';
import { buttonProps } from './AppButton';
export interface selectButtonProps extends buttonProps {
    value: string;
    text: string;
    color?: AppColor;
}
export interface selectButtonsProps {
    buttons: selectButtonProps[];
    onSelectionChange: (values: string[]) => void;
    selected: string[];
    multi?: boolean;
    display?: "horizontal" | "vertical";
    segment?: boolean;
}
/**
 * Component for a select interface via buttons
 */
declare const AppSelectButtons: React.FC<selectButtonsProps>;
export default AppSelectButtons;
