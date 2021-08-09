import { IonCol, IonContent, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import { AppToolbar } from '.';
import { AppNextButton } from './global/AppNextButton';



/**
 * Component that allows for contents to be scrollable
 * We'll customize the scrollbar here later.
 */
const AppContent: React.FC<{ center?: boolean, next?: boolean }> = (props) => {

    return props.center ?
        <IonContent>
            <IonGrid>
                <IonRow>
                    <IonCol sizeSm="1" sizeXs="0" sizeMd={'4'}>
                    </IonCol>
                    <IonCol sizeSm="22" sizeXs="24" sizeMd='16'>
                        {props.children}
                        {props.next && <AppNextButton />}
                    </IonCol>
                </IonRow>

            </IonGrid>
        </IonContent> : <IonContent>
            {props.children}
            {props.next && <AppToolbar>
                <AppNextButton />
            </AppToolbar>}
        </IonContent>
}
export default AppContent;