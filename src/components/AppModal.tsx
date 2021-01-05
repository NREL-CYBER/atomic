import { IonModal } from '@ionic/react';
import React, { ReactFragment } from 'react';
import { AppColor } from '../theme/AppColor';



interface appModalProps {
    color?: AppColor
    isOpen: boolean,
    children: ReactFragment
    onDismiss: () => void
}

/**
 * Component for modals
 *  
 */
const AppModal: React.FC<appModalProps> = (props) =>
    <IonModal onDidDismiss={props.onDismiss && props.onDismiss} {...props} />

export default AppModal;
