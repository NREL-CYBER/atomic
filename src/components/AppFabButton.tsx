import { IonFabButton } from '@ionic/react';
import React from 'react';


interface itemProps {
    onClick?: () => void
    disabled?: boolean
}

/**
* Floating action button, put this inside an AppFab
*/
const AppFabButton: React.FC<itemProps> = (props) => {
    return <IonFabButton {...props} />
};
export default AppFabButton;