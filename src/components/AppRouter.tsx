import { IonGrid } from '@ionic/react';
import React from 'react';
import { IonReactHashRouter } from '@ionic/react-router';


interface appRouterProps {
    id: string
}

/**
 * Component for routing root pages
 */
const AppRouter: React.FC<appRouterProps> = (props) =>
    <IonReactHashRouter {...props} />


export default AppRouter;