import { IonToggle } from '@ionic/react';
import React from 'react';


interface toggleProps {
    checked: boolean | undefined
    onToggleChange?: (value: boolean) => void
}
/**
 * Component to get booleans from the user
 */
const AppToggle: React.FC<toggleProps> = (props) => {
    return <IonToggle onIonChange={(e) => { props.onToggleChange && props.onToggleChange(e.detail.checked!) }} {...props} />
};
export default AppToggle;