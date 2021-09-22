import { IonLabel } from '@ionic/react';
import React from 'react';
import { AppColor } from '../theme/AppColor';


interface labelProps {
    position?: "stacked" | "fixed" | "floating"
    color?: AppColor
}

/**
 * A text label
 */
const AppLabel: React.FC<labelProps> = (props) => {
    return <IonLabel className="ion-text-wrap" style={{ paddingLeft: 5 }} {...props} />
};
export default AppLabel;