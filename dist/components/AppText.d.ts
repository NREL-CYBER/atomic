import React from 'react';
import { AppColor } from '../theme/AppColor';
interface textProps {
    className?: string;
    color?: AppColor;
    style?: Record<string, any>;
    onBlur?: () => void;
}
/**
 * Component to display text with optional color
 */
declare const AppText: React.FC<textProps>;
export default AppText;
