import { IonSelect } from '@ionic/react';
import React from 'react';
import { AppColor } from '../theme/AppColor';


interface selectStringProps {
    interface?: "popover" | "alert" | "action-sheet"
    placeholder?: string
    value?: string
    color?: AppColor
    onSelectionChange?: (value: string) => void
}

/**
 * Component for a select interface for selecting a single string
 */
const AppSelectString: React.FC<selectStringProps> = (props) => {
    return <IonSelect  style={props.color && { color: "var(--ion-color-" + props.color + ")", "--color": "var(--ion-color-" + props.color + ")", "--placeholder-color": "var(--ion-color-" + props.color + ")" }} onIonChange={(e) => {
        props.onSelectionChange && props.onSelectionChange(e.detail.value)
    }} {...props} />
};
export default AppSelectString;