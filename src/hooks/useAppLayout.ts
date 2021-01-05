import create from "zustand";
import { AppRoute } from "../routing";



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
const calculateNextPage = (allFlattenedRoutes: AppRoute[], path: string): AppRoute => {
    let currentRouteIndex = allFlattenedRoutes.findIndex(x => x && x.path == path)
    if (currentRouteIndex == -1) {
        const lastBreadCrumb = selectBreadCrumbs(allFlattenedRoutes, path).pop();
        currentRouteIndex = lastBreadCrumb ? allFlattenedRoutes.indexOf(lastBreadCrumb) : -1;
    }
    return allFlattenedRoutes[currentRouteIndex + 1];
}


/**
 * Type that defines what the useApplayout hook will be capable of
 */
type AppLayout = {
    id: string,
    title: string,
    allPageRoutes: AppRoute[]
    rootRoute: AppRoute
    nextPageRoutes: AppRoute[]
    currentRootPage: AppRoute
    breadCrumbs: AppRoute[]
    path: string
    nextPage: AppRoute
    update: (pathname: string) => void
}

/**
 *  Hook for Responsible for the current page title
 *  storing all the routes
 *  and knowing the nested page and determining the next page.
 */
const useAppLayout = create<AppLayout>((set, store) => ({
    /* all Routes in the app */
    id: "",
    path: "",
    title: "",
    allPageRoutes: [],
    rootRoute: { icon: "", path: "", title: "" },
    nextPageRoutes: [],
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
        const currentRootPage = store().allPageRoutes.find(route => route && route.path == rootPagePath) as AppRoute || store().rootRoute;
        // fallback to the app title
        const title = currentRootPage ? currentRootPage.title : ""

        const breadCrumbs = selectBreadCrumbs(store().allPageRoutes, pathname);
        const nextPage = calculateNextPage(store().nextPageRoutes, pathname);

        const lastPathItem = pathPeices[pathPeices.length - 1];
        set({ breadCrumbs, path, nextPage, title, currentRootPage, id: lastPathItem })
    }
}));
export default useAppLayout;