import React from "react";
declare type dateTimeFormat = "MMMM YYYY" | "h:mm a" | "HH:mm" | "DD/MMM/YYYY";
interface dateTimeProps {
    onDateEntered: (date: string) => void;
    displayFormat?: dateTimeFormat;
    pickerFormat?: dateTimeFormat;
    value?: string;
    min?: string;
    max?: string;
    disabled?: boolean;
}
export declare const AppDateTime: React.FC<dateTimeProps>;
export {};
