import React from 'react';
import { AppColor } from '../theme/AppColor';
export declare type CyberAppFill = "clear" | "outline" | "solid" | "default" | undefined;
interface badgeProps {
    color?: AppColor;
    className?: string;
}
/**
 * Button Component
 */
declare const AppBadge: React.FC<badgeProps>;
export default AppBadge;
