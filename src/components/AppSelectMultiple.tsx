import { IonSelect } from '@ionic/react';
import React from 'react';


interface selectMultipleProps {
    placeholder?: string
    value?: string[]
    onSelectionChange?: (value: string[]) => void
}

/**
 * Component for a select interface
 */
const AppSelect: React.FC<selectMultipleProps> = (props) => {
    return <IonSelect interface="alert" onIonChange={(e) => {
        props.onSelectionChange && props.onSelectionChange(e.detail.value)
    }} {...props} />
};
export default AppSelect;