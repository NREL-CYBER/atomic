import React from 'react';
interface selectMultipleProps {
    placeholder?: string;
    value?: string[];
    onSelectionChange?: (value: string[]) => void;
}
/**
 * Component for a select interface
 */
declare const AppSelect: React.FC<selectMultipleProps>;
export default AppSelect;
