import { AppRoute, AppPath } from "..";
/**
 * Type that defines what the useApplayout hook will be capable of
 */
declare type AppLayout = {
    id: string;
    title: string;
    allRoutesFlattened: AppRoute[];
    allPageRoutes: AppRoute[];
    rootRoute: AppRoute;
    order: AppPath[];
    currentRootPage: AppRoute;
    breadCrumbs: AppRoute[];
    path: string;
    nextPage: AppRoute;
    update: (pathname: string) => void;
    initialize: (routes: AppRoute[]) => void;
};
/**
 *  Hook for Responsible for the current page title
 *  storing all the routes
 *  and knowing the nested page and determining the next page.
 */
declare const useAppLayout: import("zustand").UseStore<AppLayout>;
export default useAppLayout;
