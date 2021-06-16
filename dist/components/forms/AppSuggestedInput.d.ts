import React from 'react';
import { AppColor } from '../../theme';
export declare type stringFormat = "number" | "time" | "text" | "date" | "email" | "password" | "search" | "tel" | "url" | "week" | "month" | "datetime-local" | undefined;
interface inputProps {
    onInputChange: (value: string) => void;
    placeholder?: string;
    value?: string;
    color?: AppColor;
    type?: stringFormat;
    values: string[];
    id: string;
}
/**
 * Component for text input
 */
declare const AppSuggestedInput: React.FC<inputProps>;
export default AppSuggestedInput;
