import { IonFabButton } from '@ionic/react';
import React, { MouseEventHandler } from 'react';


interface itemProps {
    onClick?: MouseEventHandler
    disabled?: boolean
}

/**
* Floating action button, put this inside an AppFab
*/
const AppFabButton: React.FC<itemProps> = (props) => {
    return <IonFabButton {...props} />
};
export default AppFabButton;