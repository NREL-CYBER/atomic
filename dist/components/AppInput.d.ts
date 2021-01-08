import React from 'react';
interface inputProps {
    onInputChange?: (value: string) => void;
    placeholder: string;
    value?: string;
    onLoseFocus?: () => void;
}
/**
 * Component for text input
 */
declare const AppInput: React.FC<inputProps>;
export default AppInput;
