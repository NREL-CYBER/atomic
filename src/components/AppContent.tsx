import { IonCol, IonContent, IonGrid, IonRow } from '@ionic/react';
import React, { useLayoutEffect, useRef } from 'react';
import { AppToolbar } from '.';
import { AppNextButton } from './global/AppNextButton';



/**
 * Component that allows for contents to be scrollable
 * We'll customize the scrollbar here later.
 */
const AppContent: React.FC<{ center?: boolean, next?: boolean }> = (props) => {
    const contentRef = useRef<HTMLIonContentElement>(null)
    useLayoutEffect(() => {
        const styles = document.createElement('style');
        styles.textContent = `
          ::-webkit-scrollbar {
            width: 9px;
          }
      
          /* Track */
          ::-webkit-scrollbar-track {
            border-radius: 5px;
          }
      
          /* Handle */
          ::-webkit-scrollbar-thumb {
            background: rgb(80,80,80); 
            border-radius: 10px;
            padding-right:3px;
          }
      
          /* Handle on hover */
          ::-webkit-scrollbar-thumb:hover {
            background: rgb(90,90,90); 
          }
        `;
        contentRef.current?.shadowRoot?.appendChild(styles);
    }, [contentRef.current?.shadowRoot, contentRef])
    return props.center ?
        <IonContent ref={contentRef}>
            <IonGrid>
                <IonRow>
                    <IonCol sizeSm="1" sizeXs="0" sizeMd={'4'}>
                    </IonCol>
                    <IonCol sizeSm="22" sizeXs="24" sizeMd='16'>
                        {props.children}
                        {props.next && <AppToolbar>
                            <AppNextButton />
                        </AppToolbar>}
                    </IonCol>
                </IonRow>

            </IonGrid>
        </IonContent> : <IonContent ref={contentRef}>
            {props.children}
            {props.next && <AppToolbar>
                <AppNextButton />
            </AppToolbar>}
        </IonContent>
}
export default AppContent;