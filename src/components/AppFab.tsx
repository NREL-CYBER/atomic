import { IonFab } from '@ionic/react';
import React from 'react';
import { AppColor } from '../theme/AppColor';


interface itemProps {
    vertical?: "top" | "bottom"
    horizontal?: "start" | "end"
    slot?: "fixed"
    color?: AppColor
}

/**
 * Container for a FabButton
 * use vertical and horizontal props for positioning
 */
const AppFab: React.FC<itemProps> = (props) => {
    return <IonFab {...props} />
};
export default AppFab;