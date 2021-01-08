import React, { ReactFragment } from 'react';
import { AppColor } from '../theme/AppColor';
interface popoverProps {
    color?: AppColor;
    children: ReactFragment;
    isOpen: boolean;
    onDismiss: () => void;
}
/**
 * Component that stores the root of the application and control current theme
 */
declare const AppPopover: React.FC<popoverProps>;
export default AppPopover;
