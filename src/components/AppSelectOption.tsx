import React from 'react';
import { AppColor } from '../theme/AppColor';
import { IonSelectOption } from '@ionic/react';


interface selectOptionProps {
    value: string
    color?: AppColor
}

/**
 * Component for a selection option
 */
const AppSelectOption: React.FC<selectOptionProps> = (props) => {
    return <IonSelectOption {...props} children={props.children ? props.children : props.value} />
};
export default AppSelectOption;