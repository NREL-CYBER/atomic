import { IonDatetime } from "@ionic/react";
import React from "react";

export type dateTimeFormat = undefined | "MMMM YYYY" | "h:mm a" | "HH:mm" | "DD/MMM/YYYY" | "YYYY-MM-DDTHH:mm:ssTZD" | "YYYY-MM-DD";
interface dateTimeProps {
    onDateEntered: (date: string) => void
    displayFormat?: dateTimeFormat
    pickerFormat?: dateTimeFormat
    value?: string
    min?: string
    max?: string
    disabled?: boolean
}

export const AppDateTime: React.FC<dateTimeProps> = (props) => <IonDatetime displayTimezone={"utc"}
    onIonChange={e => {
        props.onDateEntered(e.detail.value!)
    }} {...props} />
