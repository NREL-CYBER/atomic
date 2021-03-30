import React from 'react';
interface selectSingleProps {
    interface?: "popover" | "alert" | "action-sheet";
    placeholder?: string;
    value?: string;
    onSelectionChange?: (value: string) => void;
}
/**
 * Component for a select interface for selecting a single string
 */
declare const AppSelectSingle: React.FC<selectSingleProps>;
export default AppSelectSingle;
