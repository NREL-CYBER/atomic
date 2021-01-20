import React from 'react';
import { AppColor } from '..';
interface inputProps {
    onInputChange?: (value: string) => void;
    placeholder: string;
    value?: string;
    color?: AppColor;
}
/**
 * Component for text input
 */
declare const AppInput: React.FC<inputProps>;
export default AppInput;
