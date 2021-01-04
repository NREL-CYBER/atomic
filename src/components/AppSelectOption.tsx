import React from 'react';
import { AppColor } from './AppCard';
import { IonSelectOption } from '@ionic/react';


interface selectOptionProps {
    value: string
    color?: AppColor
}

/**
 * Component for a selection option
 */
const AppSelectOption: React.FC<selectOptionProps> = (props) => {
    return <IonSelectOption {...props} />
};
export default AppSelectOption;