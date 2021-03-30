import React from 'react';
interface selectArrayProps {
    placeholder?: string;
    value?: string[];
    multiple?: boolean;
    onSelectionChange?: (value: string[]) => void;
}
/**
 * Component for a select interface
 */
declare const AppSelectMulitple: React.FC<selectArrayProps>;
export default AppSelectMulitple;
