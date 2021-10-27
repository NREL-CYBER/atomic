import { IonSegment, IonSegmentButton } from '@ionic/react';
import { AppChip, AppText } from 'atomic';
import React from 'react';
import { AppItem } from '.';
import { AppColor } from '../theme';
import { RogueColor } from '../theme/AppColor';
import AppButton, { buttonProps } from './AppButton';
import AppList from './AppList';

export interface selectButtonProps extends buttonProps {
    value: string
    text?: string,
    color?: AppColor,
    colorOverride?: RogueColor
}
export interface selectButtonsProps {
    buttons: selectButtonProps[]
    onSelectionChange: (values: string[]) => void
    selected: string[]
    multi?: boolean
    display?: "horizontal" | "vertical"
    segment?: boolean
    allowEmpty?: boolean
}

/**
 * Component for a select interface via buttons
 */
const AppSelectButtons: React.FC<selectButtonsProps> = ({ segment, allowEmpty, selected, buttons, onSelectionChange, multi, display = "horizontal" }) => {

    const selectButtons =
        buttons.map((button, i) => <AppButton key={i}
            fill={selected.includes(button.value) ? "solid" : "clear"}
            children={button.text || button.value} {...button}
            onClick={() => {
                if (multi) {
                    const newselected = selected.includes(button.value) ? selected.filter(v => v !== button.value) : [...selected, button.value];
                    onSelectionChange(newselected);
                } else {
                    const [selectedValue] = selected;
                    const isAlreadySelected = selectedValue === button.value && allowEmpty
                    isAlreadySelected ? onSelectionChange([]) : onSelectionChange([button.value]);
                }
            }} />)


    if (segment && display === "horizontal") {
        return <IonSegment value={selected[0]} onIonChange={(e) => {
            onSelectionChange([e.detail.value!])
        }} color="primary">
            {buttons.map(({ text, value, color, fill, disabled }) =>
                disabled ? <></> : <IonSegmentButton color={"primary"} value={value}  >
                    <AppButton color={color} fill={fill}>
                        {text}
                    </AppButton>
                </IonSegmentButton>
            )}
        </IonSegment>
    }
    return display === "horizontal" ? <>{selectButtons}</> : <AppList>
        {buttons.map((button, i) => <AppItem key={i}
            onClick={() => {
                if (multi) {
                    const newselected = selected.includes(button.value) ? selected.filter(v => v !== button.value) : [...selected, button.value];
                    onSelectionChange(newselected);
                } else {
                    const [selectedValue] = selected;
                    const isAlreadySelected = selectedValue === button.value && allowEmpty
                    isAlreadySelected ? onSelectionChange([]) : onSelectionChange([button.value]);
                }
            }} >

            {!selected.includes(button.value) ? <AppText color={button.color} >
                {button.text || button.value}
            </AppText> : <AppChip color={button.color}>{button.text || button.value}</AppChip>}
        </AppItem>)
        }
    </AppList >
};
export default AppSelectButtons;