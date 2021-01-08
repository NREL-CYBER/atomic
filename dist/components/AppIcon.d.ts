import React from 'react';
import { AppColor } from '../theme/AppColor';
interface iconProps {
    slot?: "start" | "end";
    icon: string;
    size?: "large" | "small";
    color?: AppColor;
}
/**
 * Component to display an icon
 */
declare const AppIcon: React.FC<iconProps>;
export default AppIcon;
