import React from 'react';
import { AppColor } from '../theme';
import AppButton, { buttonProps } from './AppButton';

export interface selectButtonProps extends buttonProps {
    value: string
    text: string,
    color?: AppColor,
}
export interface selectButtonsProps {
    buttons: selectButtonProps[]
    onSelectionChange: (values: string[]) => void
    selected: string[]
    multi?: boolean
}

/**
 * Component for a select interface via buttons
 */
const AppSelectButtons: React.FC<selectButtonsProps> = ({ selected, buttons, onSelectionChange, multi }) => {
    return <>
        {buttons.map(button => <AppButton
            fill={selected.includes(button.value) ? "solid" : "outline"}
            children={button.text} {...button}
            onClick={() => {
                if (multi) {
                    const newselected = selected.includes(button.value) ? selected.filter(v => v !== button.value) : [...selected, button.value];
                    onSelectionChange(newselected);
                } else {
                    onSelectionChange([button.value]);
                }
            }} />)}
    </>
};
export default AppSelectButtons;