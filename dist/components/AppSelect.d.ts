import React from 'react';
interface selectProps {
    interface?: "popover" | "alert" | "action-sheet";
    placeholder?: string;
    value?: string;
    multiple?: boolean;
    onSelectionChange?: (value: string | string[]) => void;
}
/**
 * Component for a select interface
 */
declare const AppSelect: React.FC<selectProps>;
export default AppSelect;
