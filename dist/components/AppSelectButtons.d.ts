import React from 'react';
import { buttonProps } from './AppButton';
import { AppColor } from '../theme';
export interface selectButtonProps extends buttonProps {
    value: string;
    text: string;
    color?: AppColor;
}
export interface selectButtonsProps {
    buttons: selectButtonProps[];
    onSelectionChange: (values: string[]) => void;
    data: string[];
    multi?: boolean;
}
/**
 * Component for a select interface via buttons
 */
declare const AppSelectButtons: React.FC<selectButtonsProps>;
export default AppSelectButtons;
