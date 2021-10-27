import React, { ReactFragment } from 'react';
import { AppColor } from '../theme/AppColor';
import { selectButtonsProps } from './AppSelectButtons';
interface appModalProps {
    color?: AppColor;
    isOpen: boolean;
    backdropDismiss?: boolean;
    children: ReactFragment;
    onDismiss: () => void;
    smol?: boolean;
    closeBar?: boolean;
    title?: string;
    titleColor?: AppColor;
    headerColor?: AppColor;
    closeButton?: boolean;
    buttons?: selectButtonsProps;
}
/**
 * Component for modals
 *
 */
declare const AppModal: React.FC<appModalProps>;
export default AppModal;
