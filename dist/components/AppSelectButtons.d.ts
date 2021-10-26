import React from 'react';
import { AppColor } from '../theme';
import { buttonProps } from './AppButton';
import { RogueColor } from '../theme/AppColor';
export interface selectButtonProps extends buttonProps {
    value: string;
    text?: string;
    color?: AppColor;
    colorOverride?: RogueColor;
}
export interface selectButtonsProps {
    buttons: selectButtonProps[];
    onSelectionChange: (values: string[]) => void;
    selected: string[];
    multi?: boolean;
    display?: "horizontal" | "vertical";
    segment?: boolean;
    allowEmpty?: boolean;
}
/**
 * Component for a select interface via buttons
 */
declare const AppSelectButtons: React.FC<selectButtonsProps>;
export default AppSelectButtons;
