import { IonApp, IonPage } from '@ionic/react';
import "@ionic/react/css/core.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import { addDecorator } from "@storybook/react";
import React from 'react';
import { AppContent } from '.';





const AppWrapper: React.FC = ({ children }) => {
    return (
        <IonApp>
            <IonPage>
                <AppContent>{children}</AppContent>
            </IonPage>
        </IonApp>
    );
};

addDecorator((storyFn) => <AppWrapper>{storyFn()}</AppWrapper>);