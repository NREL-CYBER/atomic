import { IonItemDivider } from '@ionic/react';
import React from 'react';
import { AppColor } from '../theme/AppColor';


interface labelProps {
    color?: AppColor
}

/**
 * A text label
 */
const AppItemDivider: React.FC<labelProps> = (props) => {
    return <IonItemDivider {...props} />
};
export default AppItemDivider;