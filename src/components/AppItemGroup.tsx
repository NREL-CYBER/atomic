import React from 'react';
import { AppColor } from '../theme/AppColor';
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