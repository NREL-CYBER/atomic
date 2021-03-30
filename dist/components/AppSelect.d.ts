import React from 'react';
interface selectStringProps {
    interface?: "popover" | "alert" | "action-sheet";
    placeholder?: string;
    value?: string;
    onSelectionChange?: (value: string) => void;
}
/**
 * Component for a select interface for selecting a single string
 */
declare const AppSelectString: React.FC<selectStringProps>;
export default AppSelectString;
