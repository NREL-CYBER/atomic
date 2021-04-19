import { IonModal } from '@ionic/react';
import React, { ReactFragment } from 'react';
import { AppColor } from '../theme/AppColor';
import { useAppLayout } from '../hooks';



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
const AppModal: React.FC<appModalProps> = (props) => {
    const { darkMode } = useAppLayout();
    return <IonModal cssClass={darkMode ? "dark-theme" : "light-theme"} onDidDismiss={props.onDismiss && props.onDismiss} {...props} />
}

export default AppModal;
