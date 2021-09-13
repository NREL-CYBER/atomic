import { IonPage } from '@ionic/react';
import React from 'react';


/**
 * Functional Component that wraps any root page
 */
const AppPage: React.FC<{ fullscreen?: boolean, id?: string }> = ({ children, fullscreen = false, id }) => {
    console.log("page");
    return (<IonPage id={id || "main"}>
        {children}
    </IonPage>
    );
};
export default AppPage;