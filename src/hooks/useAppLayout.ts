import create from "zustand";
import { AppRoute, AppPath } from "../core/routing";
import { AppConfig } from "../util";

const EmptyRoute: AppRoute = { icon: "", path: "", title: "", }
/**
 * Get the bread crumbs from the current path
 * @param breadCrumbRoutes All routes that can become breadcrumbs
 * @param path Current Path
 */
const selectBreadCrumbs = (breadCrumbRoutes: AppRoute[], path: string): AppRoute[] => {
    return breadCrumbRoutes.filter(x => x && path.includes(x.path));
}
/**
 * Determine the next page given the current path
 * @param allFlattenedRoutes Routes that include nested routes in order 
 * @param path the current path
 */
const calculateNextPage = (allPageRoutes: AppRoute[], routeOrder: AppPath[], path: string): AppRoute => {
    let currentRouteIndex = routeOrder.findIndex(routePath => routePath === path)
    const nextRoutePath = routeOrder[currentRouteIndex + 1];
    return allPageRoutes.find(route => route.path === nextRoutePath) || EmptyRoute;
}


/**
 * Type that defines what the useApplayout hook will be capable of
 */
type AppLayout = {
    status: "booting" | "idle",
    id: string,
    appTitle: string,
    title: string,
    version: string,
    allRoutesFlattened: AppRoute[]
    allPageRoutes: AppRoute[]
    rootRoute: AppRoute
    order: AppPath[]
    currentRootPage: AppRoute
    breadCrumbs: AppRoute[]
    path: string
    nextPage: AppRoute
    update: (pathname: string) => void
    initialize: (config: AppConfig) => void
}

/**
 *  Hook for Responsible for the current page title
 *  storing all the routes
 *  and knowing the nested page and determining the next page.
 */
const useAppLayout = create<AppLayout>((set, store) => ({
    status: "booting",
    version: "",
    appTitle: "",
    initialize: ({ routes, title, version }) => {
        const allPageRoutes = routes;
        const allRoutesFlattened = routes
            .map(route => route.nested ?
                [route, ...route.nested] : [route]
            )
            .reduce((flatRoutes, moreFlatRoutes) => ([
                ...flatRoutes, ...moreFlatRoutes
            ]));
        const rootRoute = routes.find(x => x.path === "/")!;
        if (!rootRoute) { 
            throw new Error("Missing Root route");
        }
        const order = allRoutesFlattened.map(x => x.path);
        const appTitle = title;
        set({ appTitle, title, version, status: "idle", rootRoute, allPageRoutes: allPageRoutes.filter(x => x.path !== "/"), allRoutesFlattened, order });
    },
    id: "",
    path: "",
    title: "",
    allPageRoutes: [],
    allRoutesFlattened: [],
    rootRoute: { icon: "", path: "", title: "" },
    order: [],
    currentRootPage: { icon: "", path: "", title: "" },
    breadCrumbs: [] as AppRoute[],
    nextPage: {} as AppRoute,

    update: (pathname: string) => {
        const path = pathname;
        // "/example-page/bunch/of/params" -> ['example-page','bunch','of','params']
        const pathPeices = pathname.split('/');
        // "/example-page/bunch/of/params" -> example-page
        const rootPage = pathname.slice(1).split('/').shift() || "";
        // /example-page
        const rootPagePath = "/" + rootPage;
        // find the full Page object
        const currentRootPage = store().allPageRoutes.find(route => route && route.path === rootPagePath) as AppRoute || store().rootRoute;
        // fallback to the app title
        const title = currentRootPage ? currentRootPage.title : ""

        const breadCrumbs = selectBreadCrumbs(store().allPageRoutes, pathname);
        const nextPage = calculateNextPage(store().allRoutesFlattened, store().order, pathname);

        const lastPathItem = pathPeices[pathPeices.length - 1];
        set({ breadCrumbs, path, nextPage, title, currentRootPage, id: lastPathItem })
    }
}));
export default useAppLayout;