import React from 'react';
import { AppColor } from '../theme/AppColor';
interface itemProps {
    color?: AppColor;
    className?: string;
    onClick?: () => void;
}
/**
 * Chip Element!
 */
declare const AppChip: React.FC<itemProps>;
export default AppChip;
