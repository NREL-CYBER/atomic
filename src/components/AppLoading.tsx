import { IonLoading } from '@ionic/react';
import React from 'react';

interface loadingProps {
    isOpen: boolean
}

/**
 * Component to show a loading overlay on the application
 */
const AppLoading: React.FC<loadingProps> = (props) => {
    return <IonLoading  {...props} />
};
export default AppLoading;