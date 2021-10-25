import { IonModal } from '@ionic/react';
import { AppContent } from 'atomic';
import React, { ReactFragment } from 'react';
import { AppCard } from '.';
import { useAppSettings } from '../hooks/useAppSettings';
import { AppColor } from '../theme/AppColor';



interface appModalProps {
    color?: AppColor
    isOpen: boolean,
    backdropDismiss?: boolean,
    children: ReactFragment
    onDismiss: () => void
    smol?: boolean
    closeBar?: boolean
}

/**
 * Component for modals
 *  
 */
const AppModal: React.FC<appModalProps> = (props) => {
    const { children, smol, ...otherProps } = props;
    const { darkMode } = useAppSettings();
    return <IonModal animated={true} cssClass={[smol ? "smol" : "", darkMode ? "dark-theme" : "light-theme"]}
        onDidDismiss={props.onDismiss && props.onDismiss}
        {...otherProps} >
        {children}
    </IonModal >
}

export default AppModal;
