import create from "zustand";
const EmptyRoute = {
  icon: "",
  path: "",
  title: ""
};
/**
 * Get the bread crumbs from the current path
 * @param breadCrumbRoutes All routes that can become breadcrumbs
 * @param path Current Path
 */

const selectBreadCrumbs = (breadCrumbRoutes, path) => {
  return breadCrumbRoutes.filter(x => {
    return breadCrumbRoutes.filter(x => !x.dynamic).filter(x => x.path.split("/").filter(segment => path.split("/").includes(segment)));
  });
};
/**
 * Determine the next page given the current path
 * @param allFlattenedRoutes Routes that include nested routes in order 
 * @param path the current path
 */


const calculateNextPage = (allPageRoutes, routeOrder, path) => {
  let currentRouteIndex = routeOrder.findIndex(routePath => routePath === path);
  const nextRoutePath = routeOrder[currentRouteIndex + 1];
  return allPageRoutes.find(route => route.path === nextRoutePath) || EmptyRoute;
};
/**
 * Type that defines what the useApplayout hook will be capable of
 */


/**
 *  Hook for Responsible for the current page title
 *  storing all the routes
 *  and knowing the nested page and determining the next page.
 */
const useAppLayout = create((set, store) => ({
  status: "booting",
  version: "0.0.0-development",
  server: undefined,
  appTitle: "",
  setStatus: status => {
    set({
      status
    });
  },
  initialize: ({
    routes,
    title,
    version,
    cache
  }) => {
    const allPageRoutes = routes;
    const allRoutesFlattened = routes.map(route => route.nested ? [route, ...route.nested] : [route]).reduce((flatRoutes, moreFlatRoutes) => [...flatRoutes, ...moreFlatRoutes]);
    const rootRoute = routes.find(x => x.path === "/");

    if (!rootRoute) {
      throw new Error("Missing Root route");
    }

    const order = allRoutesFlattened.map(x => x.path);
    const appTitle = title;
    const status = typeof cache !== "undefined" ? "synchronizing" : "idle";
    set({
      appTitle,
      title,
      version,
      status,
      rootRoute,
      allPageRoutes: allPageRoutes.filter(x => x.path !== "/"),
      allRoutesFlattened,
      order
    });
  },
  id: "",
  path: "",
  title: "",
  allPageRoutes: [],
  allRoutesFlattened: [],
  rootRoute: {
    icon: "",
    path: "",
    title: ""
  },
  order: [],
  currentRootPage: {
    icon: "",
    path: "",
    title: ""
  },
  breadCrumbs: [],
  nextPage: {},
  update: pathname => {
    const path = pathname; // "/example-page/bunch/of/params" -> ['example-page','bunch','of','params']

    const pathPeices = pathname.split('/'); // "/example-page/bunch/of/params" -> example-page

    const rootPage = pathname.slice(1).split('/').shift() || ""; // /example-page

    const rootPagePath = "/" + rootPage; // find the full Page object

    const currentRootPage = store().allPageRoutes.find(route => route && route.path === rootPagePath) || store().rootRoute; // fallback to the app title

    const title = currentRootPage ? currentRootPage.title : "";
    const breadCrumbs = selectBreadCrumbs(store().allPageRoutes, pathname);
    const nextPage = calculateNextPage(store().allRoutesFlattened, store().order, pathname);
    const lastPathItem = pathPeices[pathPeices.length - 1];
    set({
      breadCrumbs,
      path,
      nextPage,
      title,
      currentRootPage,
      id: lastPathItem
    });
  }
}));
export default useAppLayout;