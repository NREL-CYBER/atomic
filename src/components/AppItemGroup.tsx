import React from 'react';
import { AppColor } from './AppCard';
import { IonItemGroup } from '@ionic/react';


interface labelProps {
    color?: AppColor
}

/**
 * A text label
 */
const AppItemGroup: React.FC<labelProps> = (props) => {
    return <IonItemGroup {...props} />
};
export default AppItemGroup;