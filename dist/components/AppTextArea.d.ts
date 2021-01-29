import React from 'react';
import { AppColor } from '../theme/AppColor';
interface textProps {
    className?: string;
    color?: AppColor;
    onTextChange: (value: string) => void;
    value: string;
    inputMode?: "text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | undefined;
}
/**
 * Component to display text with optional color (onText change debounced by 500ms)
 */
declare const AppTextArea: React.FC<textProps>;
export default AppTextArea;
