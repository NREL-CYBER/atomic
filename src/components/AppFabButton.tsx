import { IonFabButton } from '@ionic/react';
import React, { MouseEventHandler } from 'react';
import { AppColor } from '../theme/AppColor';


interface itemProps {
    onClick?: MouseEventHandler
    disabled?: boolean
    color?: AppColor,
    size?: "small"
}

/**
* Floating action button, put this inside an AppFab
*/
const AppFabButton: React.FC<itemProps> = (props) => {
    return <IonFabButton   {...props} />
};
export default AppFabButton;