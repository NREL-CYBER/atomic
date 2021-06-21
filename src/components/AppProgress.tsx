import { IonProgressBar } from '@ionic/react';
import React from 'react';
import { AppColor } from '../theme/AppColor';


interface progressProps {
    value?: number,
    color?: AppColor
}
/**
 * Component that stores the root of the application and control current theme
 */
const AppProgress: React.FC<progressProps> = ({ color = "primary", children, value }) =>
    <IonProgressBar color={color} children={children} type={typeof value === "undefined" ? "indeterminate" : "determinate"} value={value} />


export default AppProgress;
