import { IonModal } from '@ionic/react';
import React, { ReactFragment } from 'react';
import { useAppSettings } from '../hooks/useAppSettings';
import { AppColor } from '../theme/AppColor';



interface appModalProps {
    color?: AppColor
    isOpen: boolean,
    backdropDismiss?: boolean,
    children: ReactFragment
    onDismiss: () => void
}

/**
 * Component for modals
 *  
 */
const AppModal: React.FC<appModalProps> = (props) => {
    const { darkMode } = useAppSettings();
    return <IonModal cssClass={darkMode ? "dark-theme" : "light-theme"} onDidDismiss={props.onDismiss && props.onDismiss} {...props} />
}

export default AppModal;
