import React from "react";
export declare type dateTimeFormat = undefined | "MMMM YYYY" | "h:mm a" | "HH:mm" | "DD/MMM/YYYY" | "YYYY-MM-DDTHH:mm:ssTZD" | "YYYY-MM-DD";
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
