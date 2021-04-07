import React from 'react';
import { AppColor } from '../theme';
import AppButton, { buttonProps } from './AppButton';
import AppList from './AppList';
import { AppItem } from '.';

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
    display?: "horizontal" | "vertical"
}

/**
 * Component for a select interface via buttons
 */
const AppSelectButtons: React.FC<selectButtonsProps> = ({ selected, buttons, onSelectionChange, multi, display = "horizontal" }) => {

    const selectButtons =
        buttons.map((button, i) => <AppButton key={i} 
            fill={selected.includes(button.value) ? "solid" : "outline"}
            children={button.text} {...button}
            onClick={() => {
                if (multi) {
                    const newselected = selected.includes(button.value) ? selected.filter(v => v !== button.value) : [...selected, button.value];
                    onSelectionChange(newselected);
                } else {
                    onSelectionChange([button.value]);
                }
            }} />)



    return display === "horizontal" ? <>{selectButtons}</> : <AppList>
        {selectButtons.map((button, i) =>
            <AppItem key={i}>
                {button}
            </AppItem>
        )}
    </AppList>
};
export default AppSelectButtons;