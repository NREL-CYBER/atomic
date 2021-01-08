import React from 'react';
import { AppColor } from '../theme/AppColor';
interface labelProps {
    position?: "stacked" | "fixed" | "floating";
    color?: AppColor;
}
/**
 * A text label
 */
declare const AppLabel: React.FC<labelProps>;
export default AppLabel;
