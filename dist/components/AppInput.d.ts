import React from 'react';
import { AppColor } from '../theme/AppColor';
export declare type stringFormat = "number" | "time" | "text" | "date" | "email" | "password" | "search" | "tel" | "url" | "week" | "month" | "datetime-local" | undefined;
interface inputProps {
    onInputChange?: (value: string) => void;
    placeholder: string;
    value?: string;
    color?: AppColor;
    type?: stringFormat;
}
/**
 * Component for text input
 */
declare const AppInput: React.FC<inputProps>;
export default AppInput;
