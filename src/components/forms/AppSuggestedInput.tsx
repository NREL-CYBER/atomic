/* eslint-disable react-hooks/rules-of-hooks */
import { IonButton, IonInput, IonItem, IonList, IonListHeader, useIonPopover } from '@ionic/react';
import { prettyTitle, unique } from 'atomic';
import { arrowDown, caretDown } from 'ionicons/icons';
import React, { useRef } from 'react';
import { useState } from 'react';
import { AppIcon } from '..';
import { AppColor } from '../../theme';

export type stringFormat = "number" | "time" | "text" | "date" | "email" | "password" | "search" | "tel" | "url" | "week" | "month" | "datetime-local" | undefined;

interface inputProps {
    onInputChange: (value: string) => void
    placeholder?: string
    value?: string
    color?: AppColor
    type?: stringFormat
    values: string[]
    id: string
}

/**
 * Component for text input
 */
const AppSuggestedInput: React.FC<inputProps> = ({ values, id, color, onInputChange, placeholder, type }) => {
    const [value, setValue] = useState<string>()
    const inputRef = useRef<HTMLIonInputElement>(null)
    const PopoverList: React.FC<{
        onHide: () => void;
    }> = ({ onHide }) => {
        inputRef?.current?.setFocus()
        return <IonList>
            {unique(value ? [value, ...values] : values).map((option) =>
                <IonItem onClick={() => {
                    dismiss();
                    setValue(option)
                }} button>{prettyTitle(option)}</IonItem>
            )}
        </IonList>
    };
    const [present, dismiss] = useIonPopover(PopoverList, {
        showBackdrop: false, onHide: () => dismiss()
    });

    return <>
        <IonInput color={color} ref={inputRef} id={id} autofocus value={value} enterkeyhint={"done"} onIonChange={({ detail }) => { setValue(detail.value || "") }} />
        <IonButton color={color} fill="clear" onClick={(e) => {
            present({ event: e.nativeEvent });
        }}>
            <AppIcon icon={caretDown} />
        </IonButton>
    </>
}
export default AppSuggestedInput;