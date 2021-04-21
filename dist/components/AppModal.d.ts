import React, { ReactFragment } from 'react';
import { AppColor } from '../theme/AppColor';
interface appModalProps {
    color?: AppColor;
    isOpen: boolean;
    backdropDismiss?: boolean;
    children: ReactFragment;
    onDismiss: () => void;
}
/**
 * Component for modals
 *
 */
declare const AppModal: React.FC<appModalProps>;
export default AppModal;
