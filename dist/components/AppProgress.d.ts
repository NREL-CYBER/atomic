import React from 'react';
import { AppColor } from '../theme/AppColor';
interface progressProps {
    value?: number;
    color?: AppColor;
    type?: "indeterminate" | "determinate";
}
/**
 * Component that stores the root of the application and control current theme
 */
declare const AppProgress: React.FC<progressProps>;
export default AppProgress;
