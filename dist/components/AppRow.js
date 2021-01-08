import { IonRow } from '@ionic/react';
import React from 'react';

/**
 * Row component, behaves like you expect!
 * controlling alignment and content justification enabled.
 */
const AppRow = ({
  children,
  align,
  justify
}) => <IonRow className={align && "ion-align-items-" + align + " " + justify && "ion-justify-content-" + justify}>
        {children}
    </IonRow>;

export default AppRow;