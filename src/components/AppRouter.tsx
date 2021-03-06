import { IonReactHashRouter } from '@ionic/react-router';
import React from 'react';


interface appRouterProps {
    id: string,
    animated?: boolean
    // children?: React.ReactNode
}

/**
 * Component for routing root pages
 */
const AppRouter: React.FC<React.PropsWithChildren<appRouterProps>> = (props) =>
    // @ts-ignore
   <IonReactHashRouter {...props} />


export default AppRouter;