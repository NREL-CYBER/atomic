import React from 'react';
import { buttonProps } from './AppButton';
export interface selectButtonProps extends buttonProps {
    value: string;
    text: string;
}
export interface selectButtonsProps {
    buttons: selectButtonProps[];
    onSelectionChange: (values: string[]) => void;
    multi?: boolean;
}
/**
 * Component for a select interface via buttons
 */
declare const AppSelectButtons: React.FC<selectButtonsProps>;
export default AppSelectButtons;
