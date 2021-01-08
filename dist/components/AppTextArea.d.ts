import React from 'react';
import { AppColor } from '../theme/AppColor';
interface textProps {
    className?: string;
    color?: AppColor;
    onTextChange: (value: string) => void;
    value: string;
    onLoseFocus?: () => void;
}
/**
 * Component to display text with optional color
 */
declare const AppTextArea: React.FC<textProps>;
export default AppTextArea;
