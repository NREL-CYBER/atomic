/// <reference types="react" />
export declare type AppPath = string;
export declare type AppParameter = string;
/**
 *  Storing a route with an icon title and references to nested routes.
 */
export interface AppRoute {
    title: string;
    path: AppPath;
    icon: string;
    nested?: AppRoute[];
    routerDirection?: string;
    component?: React.FC;
    exact?: boolean;
    dynamic?: boolean;
}
/**
 *  concatenate an ID onto a dynamic route.
 *  When we need more advanced routing techniques
 *  lets expand this function,
 *  for filtering lets prefer the use ?searchParams
 */
declare const destination: (route: AppRoute, params: Record<string, string>) => string;
export { destination };
