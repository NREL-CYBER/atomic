import React, { useState, useEffect } from 'react';
import AppButton, { buttonProps } from './AppButton';
import { AppColor } from '../theme';

export interface selectButtonProps extends buttonProps {
    value: string
    text: string,
    color?: AppColor,
}
export interface selectButtonsProps {
    buttons: selectButtonProps[]
    onSelectionChange: (values: string[]) => void
    data?: string[]
    multi?: boolean
}

/**
 * Component for a select interface via buttons
 */
const AppSelectButtons: React.FC<selectButtonsProps> = ({ data, buttons, onSelectionChange, multi }) => {
    const [values, setValues] = useState<string[]>(data || []);
    const [initialized, setInitialized] = useState<boolean>(false)
    useEffect(() => {
        initialized && onSelectionChange(values);
        setInitialized(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onSelectionChange, values])
    return <>
        {buttons.map(button => <AppButton
            fill={values.includes(button.value) ? "solid" : "outline"}
            children={button.text} {...button}
            onClick={() => {
                if (multi) {
                    const newValues = values.includes(button.value) ? values.filter(v => v !== button.value) : [...values, button.value];
                    setValues(newValues);
                } else {
                    setValues([button.value]);
                }
            }} />)}
    </>
};
export default AppSelectButtons;