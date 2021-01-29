import { IonCol, IonContent, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import { AppNextButton } from './global/AppNextButton';



/**
 * Component that allows for contents to be scrollable
 * We'll customize the scrollbar here later.
 */
const AppContent: React.FC<{ center?: boolean, next?: boolean }> = (props) =>
    props.center ?
        <IonContent>
            <IonGrid>
                <IonRow>
                    <IonCol sizeSm="0" sizeXs="0" sizeMd={'2'}>
                    </IonCol>
                    <IonCol sizeSm="12" sizeXs="12" sizeMd='8'>
                        {props.children}
                        {props.next && <AppNextButton />}
                    </IonCol>
                </IonRow>

            </IonGrid>
        </IonContent> : <IonContent>
            {props.children}
            {props.next && <AppNextButton />}
        </IonContent>

export default AppContent;