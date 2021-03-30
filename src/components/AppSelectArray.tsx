import { IonSelect } from '@ionic/react';
import React from 'react';


interface selectArrayProps {
    placeholder?: string
    value?: string[]
    multiple?: boolean
    onSelectionChange?: (value: string[]) => void
}

/**
 * Component for a select interface
 */
const AppSelectMulitple: React.FC<selectArrayProps> = (props) => {
    return <IonSelect multiple={true} interface={props.multiple ? "alert" : "popover"} onIonChange={(e) => {
        props.onSelectionChange && props.onSelectionChange(props.multiple ? e.detail.value : [e.detail.value])
    }} {...props} />
};
export default AppSelectMulitple;