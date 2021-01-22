import React from 'react';
import { AppRoute } from '..';
export interface routerOutletProps {
    id: string;
    root: AppRoute;
}
interface routeMapProps {
    routes: AppRoute[];
}
/**
 *
 * flatten all nested routes for a single router
 */
export declare const MapRoutes: React.FC<routeMapProps>;
/**
 * Component That contains accepts a root route with optional nested routes
 * this is how side menus and pages get their own routing
 */
export declare const AppRouterOutlet: React.FC<routerOutletProps>;
export default AppRouterOutlet;
