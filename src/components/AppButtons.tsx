import { IonButtons } from '@ionic/react';
import React from 'react';


interface buttonsProps {
    slot?: "start" | "end"
}
/**
 * Buttons Component allows for specific button placements on an App Item
 * 
 * @example <AppItem><AppButtons slot="start">Left aligned button<AppButtons/><AppItem/>
 * 
 */
const AppButtons: React.FC<buttonsProps> = (props) => {
    return <IonButtons  {...props} />
};
export default AppButtons;