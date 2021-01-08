import { IonProgressBar } from '@ionic/react';
import React from 'react';
import { AppColor } from '../theme/AppColor';


interface progressProps {
    value: number,
    color: AppColor
}
/**
 * Component that stores the root of the application and control current theme
 */
const AppProgress: React.FC<progressProps> = (props) =>
    <IonProgressBar  {...props} />

export default AppProgress;
