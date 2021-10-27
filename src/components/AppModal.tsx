import { IonModal } from '@ionic/react';
import { AppContent } from 'atomic';
import { closeOutline } from 'ionicons/icons';
import React, { ReactFragment, useRef } from 'react';
import { useAppSettings } from '../hooks/useAppSettings';
import { AppColor } from '../theme/AppColor';
import AppCard from './AppCard';
import AppFab from './AppFab';
import AppFabButton from './AppFabButton';
import AppIcon from './AppIcon';



interface appModalProps {
    color?: AppColor
    isOpen: boolean,
    backdropDismiss?: boolean,
    children: ReactFragment
    onDismiss: () => void
    smol?: boolean
    closeBar?: boolean
    title?: React.ReactFragment
    closeButton?: boolean

}

/**
 * Component for modals
 *  
 */
const AppModal: React.FC<appModalProps> = (props) => {
    const { children, smol, title, ...otherProps } = props;
    const { darkMode } = useAppSettings();
    const ref = useRef<HTMLIonModalElement>(null);
    return <IonModal css={smol ? { "--height": 300, "--width": 400 } : undefined} ref={ref} animated={true} cssClass={darkMode ? "dark-theme" : "light-theme"}
        onDidDismiss={props.onDismiss}
        {...otherProps} >
        <AppFab vertical="top" horizontal="end" >
            <AppFabButton size="small" color="clear" onClick={() => {
                ref.current?.dismiss()
            }}><AppIcon color='danger' icon={closeOutline} /></AppFabButton>
        </AppFab>
        <AppContent>
            {children}
        </AppContent>
    </IonModal >
}

export default AppModal;
