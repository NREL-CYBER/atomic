import { IonReactHashRouter } from '@ionic/react-router';
import React from 'react';


interface appRouterProps {
    id: string
}

/**
 * Component for routing root pages
 */
const AppRouter: React.FC<appRouterProps> = (props) =>
    <IonReactHashRouter {...props} />


export default AppRouter;