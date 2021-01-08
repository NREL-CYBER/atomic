import { IonRouterOutlet } from '@ionic/react';
import React from 'react';
import { Route } from 'react-router';

/**
 * 
 * flatten all nested routes for a single router 
 */
export const MapRoutes = ({
  routes
}) => {
  return <React.Fragment>
        {routes.map(route => <React.Fragment key={route.path}>
                <Route {...route} />
                {route.nested && <MapRoutes routes={route.nested} />}
            </React.Fragment>)}
    </React.Fragment>;
};
/**
 * Component That contains accepts a root route with optional nested routes
 * this is how side menus and pages get their own routing
 */

export const AppRouterOutlet = ({
  root,
  id
}) => <IonRouterOutlet id={id}>
        {root.nested ? <MapRoutes routes={root.nested} /> : <></>}
        {<Route {...root} />}
    </IonRouterOutlet>;
export default AppRouterOutlet;