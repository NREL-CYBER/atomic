import { AppRoute, AppPath } from "../core/routing";
import { AppConfig } from "../util";
/**
 * Type that defines what the useApplayout hook will be capable of
 */
export declare type AppStatus = "booting" | "synchronizing" | "idle";
declare type AppLayout = {
    status: AppStatus;
    id: string;
    appTitle: string;
    title: string;
    version: string;
    allRoutesFlattened: AppRoute[];
    allPageRoutes: AppRoute[];
    rootRoute: AppRoute;
    order: AppPath[];
    currentRootPage: AppRoute;
    breadCrumbs: AppRoute[];
    path: string;
    nextPage: AppRoute;
    darkMode: boolean;
    setDarkMode: (isDark: boolean) => void;
    update: (pathname: string) => void;
    initialize: (config: AppConfig) => void;
    setStatus: (status: AppStatus) => void;
};
/**
 *  Hook for Responsible for the current page title
 *  storing all the routes
 *  and knowing the nested page and determining the next page.
 */
declare const useAppLayout: import("zustand").UseStore<AppLayout>;
export default useAppLayout;
