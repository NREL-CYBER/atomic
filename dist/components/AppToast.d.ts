import React from 'react';
import { AppColor } from '../theme/AppColor';
interface toastProps {
    color?: AppColor;
    id: string;
    onDismiss: (id: string) => void;
    message: string;
    path?: string;
}
/**
 * A title component for an Toast item
 */
declare const AppToast: React.FC<toastProps>;
export default AppToast;
