import { IonTabButton } from '@ionic/react';
import React from 'react';


interface tabButtonProps {
    tab: string
    style?: Record<string, any>
}

/**
 * Component to display text with optional color
 */
const AppTabButton: React.FC<tabButtonProps> = (props) => {
    return <IonTabButton  {...props} />
};
export default AppTabButton;