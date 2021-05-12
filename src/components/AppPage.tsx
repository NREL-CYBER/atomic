import { IonPage, IonContent } from '@ionic/react';
import React from 'react';


/**
 * Functional Component that wraps any root page
 */
const AppPage: React.FC<{ fullscreen?: boolean }> = ({ children, fullscreen = false }) => {
    return (<IonPage id='main'>
        {!fullscreen && <div style={{ height: 55 }} />}
        <IonContent slot="fixed">
            {children}
        </IonContent>
        {!fullscreen && <div style={{ height: 55 }} />}
    </IonPage>
    );
};
export default AppPage;