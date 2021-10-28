import { IonModal } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React, { ReactFragment, useRef } from 'react';
import { AppButtons, AppContent, AppItem, AppSelectButtons, AppTitle } from '.';
import { useAppSettings } from '../hooks/useAppSettings';
import { AppColor } from '../theme/AppColor';
import AppButton from './AppButton';
import AppIcon from './AppIcon';
import { selectButtonsProps } from './AppSelectButtons';



interface appModalProps {
    color?: AppColor
    isOpen: boolean,
    backdropDismiss?: boolean,
    children: ReactFragment
    onDismiss: () => void
    smol?: boolean
    closeBar?: boolean
    title?: string,
    titleColor?: AppColor,
    headerColor?: AppColor,
    closeButton?: boolean
    buttons?: selectButtonsProps
}

/**
 * Component for modals
 *  
 */
const AppModal: React.FC<appModalProps> = (props) => {
    const { children, smol, title, buttons, titleColor, headerColor, ...otherProps } = props;
    const { darkMode } = useAppSettings();
    const ref = useRef<HTMLIonModalElement>(null);
    return <div className={smol ? "smol" : "large"}>
        <IonModal ref={ref} animated={true} cssClass={[darkMode ? "dark-theme" : "light-theme"]}
            onDidDismiss={props.onDismiss}
            {...otherProps} >
            {title && <AppItem color={headerColor || 'light'}>
                <AppTitle color={titleColor || 'tertiary'}>
                    {title}
                </AppTitle>
                <AppButtons slot='end'>
                    <AppButton onClick={() => {
                        ref.current?.dismiss();
                    }} color="danger" fill="clear">
                        <AppIcon icon={closeOutline} />
                    </AppButton>
                </AppButtons>
            </AppItem>}
            <AppContent>
                {children}
            </AppContent>
            <></>
            {buttons && <AppSelectButtons {...buttons} />}
        </IonModal ></div>
}

export default AppModal;
