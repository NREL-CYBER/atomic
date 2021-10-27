import React from 'react';
import { AppColor } from '../theme/AppColor';
interface selectStringProps {
    interface?: "popover" | "alert" | "action-sheet";
    placeholder?: string;
    value?: string;
    color?: AppColor;
    ref?: any;
    onSelectionChange?: (value: string) => void;
}
/**
 * Component for a select interface for selecting a single string
 */
declare const AppSelectString: React.FC<selectStringProps>;
export default AppSelectString;
