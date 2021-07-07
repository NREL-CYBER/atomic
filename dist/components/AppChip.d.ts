import React from 'react';
import { AppColor } from '../theme/AppColor';
interface chipProps {
    color?: AppColor;
    className?: string;
    onClick?: () => void;
    style?: Record<string, any>;
}
/**
 * Chip Element!
 */
declare const AppChip: React.FC<chipProps>;
export default AppChip;
