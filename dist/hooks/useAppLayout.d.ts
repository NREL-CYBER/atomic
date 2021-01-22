import { AppRoute } from "..";
/**
 * Type that defines what the useApplayout hook will be capable of
 */
declare type AppLayout = {
    dark: boolean;
    id: string;
    title: string;
    allPageRoutes: AppRoute[];
    rootRoute: AppRoute;
    nextPageRoutes: AppRoute[];
    currentRootPage: AppRoute;
    breadCrumbs: AppRoute[];
    path: string;
    nextPage: AppRoute;
    update: (pathname: string) => void;
    initialize: (rootRoute: AppRoute) => void;
};
/**
 *  Hook for Responsible for the current page title
 *  storing all the routes
 *  and knowing the nested page and determining the next page.
 */
declare const useAppLayout: import("zustand").UseStore<AppLayout>;
export default useAppLayout;
