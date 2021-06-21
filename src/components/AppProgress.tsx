import { IonProgressBar } from '@ionic/react';
import React from 'react';
import { AppColor } from '../theme/AppColor';


interface progressProps {
    value?: number,
    color?: AppColor
    type?: "indeterminate" | "determinate"
}
/**
 * Component that stores the root of the application and control current theme
 */
const AppProgress: React.FC<progressProps> = ({ color = "primary", children, type = "indeterminate", value }) =>
    <IonProgressBar color={color} children={children} type={type} value={value} />


export default AppProgress;
