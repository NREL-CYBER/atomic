import { IonSelect } from '@ionic/react';
import React from 'react';


interface selectProps {
    interface?: "popover" | "alert" | "action-sheet"
    placeholder?: string
    value?: string
    multiple?: boolean
    onSelectionChange?: (value: string) => void
}

/**
 * Component for a select interface
 */
const AppSelect: React.FC<selectProps> = (props) => {
    return <IonSelect onIonChange={(e) => {
        props.onSelectionChange && props.onSelectionChange(e.detail.value)
    }} {...props} />
};
export default AppSelect;