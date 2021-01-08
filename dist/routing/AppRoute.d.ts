/// <reference types="react" />
/**
 *  Storing a route with an icon title and references to nested routes.
 */
export default interface AppRoute {
    title: string;
    path: string;
    icon: string;
    nested?: AppRoute[];
    routerDirection?: string;
    component?: React.FC;
    exact?: boolean;
    dynamic?: boolean;
}
