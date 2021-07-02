/* eslint-disable react-hooks/rules-of-hooks */
import { IonButton, IonInput, IonItem, IonList, useIonPopover } from '@ionic/react';
import { prettyTitle, unique } from 'atomic';
import { caretDown } from 'ionicons/icons';
import React, { useRef } from 'react';
import { AppIcon, AppRow } from '..';
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
const AppSuggestedInput: React.FC<inputProps> = ({ value, values, id, color, onInputChange, placeholder, type }) => {
    const inputRef = useRef<HTMLIonInputElement>(null)
    const PopoverList: React.FC<{
        onHide: () => void;
    }> = ({ onHide }) => {
        return <IonList>
            {unique(value ? [value, ...values] : values).map((option) =>
                <IonItem key={option} onClick={() => {
                    dismiss();
                    setTimeout(() => {
                        onInputChange(option)
                    }, 100)
                }} button>{prettyTitle(option)}</IonItem>
            )}
        </IonList>
    };
    const [present, dismiss] = useIonPopover(PopoverList, {
        showBackdrop: false, onHide: () => dismiss()
    });

    return <AppRow>
        <IonInput type={type} placeholder={placeholder} color={color} ref={inputRef} id={id} autofocus value={value} enterkeyhint={"done"} onIonChange={({ detail }) => {
            onInputChange(detail.value!)
        }} />
        <IonButton color={color} fill="clear" onClick={(e) => {
            present({ event: e.nativeEvent });
        }}>
            <AppIcon icon={caretDown} />
        </IonButton>
    </AppRow>
}
export default AppSuggestedInput;