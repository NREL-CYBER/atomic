import { AppPage } from "../entry.ts";
import { documentOutline, homeOutline, searchOutline } from "ionicons/icons";
import Home from "../pages/Home";
import { ExamplePaginationAndSearch } from "./ExamplePaginationAndSearch";
import { ExampleSubMenu } from "./ExampleSubMenu";
import ExampleForm from "./FormExample";
export const submenuRoute = {
  icon: documentOutline,
  path: "/submenu/",
  exact: true,
  title: "Submenu",
  component: AppPage,
  nested: [{
    icon: documentOutline,
    path: "/submenu/form2",
    title: "Form2",
    component: ExampleForm,
    exact: true
  }, {
    icon: searchOutline,
    path: "/pagination",
    title: "Pagination",
    component: ExamplePaginationAndSearch,
    exact: true
  }]
};
const routes = [{
  icon: homeOutline,
  path: "/",
  title: "",
  component: Home,
  exact: true
}, {
  icon: searchOutline,
  path: "/pagination",
  title: "Pagination",
  component: ExamplePaginationAndSearch,
  exact: true
}, {
  icon: documentOutline,
  path: "/form",
  title: "Form",
  component: ExampleForm,
  exact: true
}, {
  icon: documentOutline,
  path: "/submenu",
  title: "Submenu",
  component: ExampleSubMenu
}];
export default routes;