import React from 'react';
import { AppColor } from '../theme/AppColor';
interface selectOptionProps {
    value: string;
    color?: AppColor;
}
/**
 * Component for a selection option
 */
declare const AppSelectOption: React.FC<selectOptionProps>;
export default AppSelectOption;
