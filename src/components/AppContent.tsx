import { IonCol, IonContent, IonGrid, IonRow } from '@ionic/react';
import React from 'react';





/**
 * Component that allows for contents to be scrollable
 * We'll customize the scrollbar here later.
 */
const AppContent: React.FC<{ center?: boolean }> = (props) =>
    props.center ?
        <IonContent>
            <IonGrid>
                <IonRow>
                    <IonCol sizeSm="0" sizeXs="0" sizeMd={'3'}>
                    </IonCol>
                    <IonCol sizeSm="12" sizeXs="12" sizeMd='6'>
                        {props.children}
                    </IonCol>
                </IonRow>

            </IonGrid>
        </IonContent> : <IonContent {...props} />

export default AppContent;