import { IonDatetime } from "@ionic/react";
import React from "react";

type dateTimeFormat = "MMMM YYYY" | "h:mm a" | "HH:mm" | "DD/MMM/YYYY";
interface dateTimeProps {
    onDateEntered: (date: string) => void
    displayFormat?: dateTimeFormat
    pickerFormat?: dateTimeFormat
    value?: string
    min?: string
    max?: string
    disabled?: boolean
}

export const AppDateTime: React.FC<dateTimeProps> = (props) => <IonDatetime pickerFormat=""
    onChange={e => { props.onDateEntered(new Date(e.timeStamp).toISOString()) }} {...props} />
