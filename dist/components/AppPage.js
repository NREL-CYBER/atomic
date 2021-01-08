import { IonPage, IonContent } from '@ionic/react';
import React from 'react';
/**
 * Functional Component that wraps any root page
 */

const AppPage = ({
  children
}) => {
  return <IonPage id='main'>
        <div style={{
      height: 55
    }}></div>
        <IonContent slot="fixed">
            {children}
        </IonContent>
        <div style={{
      height: 55
    }}></div>
    </IonPage>;
};

export default AppPage;