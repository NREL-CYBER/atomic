import { IonPopover } from '@ionic/react';
import React, { ReactFragment } from 'react';
import { AppColor } from './AppCard';


interface popoverProps {
    color?: AppColor
    children: ReactFragment
    isOpen: boolean
    onDismiss: () => void
}
/**
 * Component that stores the root of the application and control current theme
 */
const AppPopover: React.FC<popoverProps> = (props) =>
    <IonPopover onDidDismiss={() => { props.onDismiss(); }} {...props} />

export default AppPopover;
