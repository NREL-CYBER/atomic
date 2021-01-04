import { IonRow } from '@ionic/react';
import React from 'react';


interface rowProps {
    align?: "start" | "end"
    justify?: "start" | "center" | "end"
}

/**
 * Row component, behaves like you expect!
 * controlling alignment and content justification enabled.
 */
const AppRow: React.FC<rowProps> = ({ children, align, justify }) =>
    <IonRow className={align && "ion-align-items-" + align + " " + justify && "ion-justify-content-" + justify}>
        {children}
    </IonRow >

export default AppRow;