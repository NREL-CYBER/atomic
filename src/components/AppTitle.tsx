import { IonTitle } from '@ionic/react';
import React from 'react';
import { AppColor } from '../theme/AppColor';


interface titleProps {
    className?: string
    color?: AppColor
}

/**
 * A title component for an App item
 */
const AppTitle: React.FC<titleProps> = (props) => {
    return <IonTitle  {...props} />
};
export default AppTitle;