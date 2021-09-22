import { AppPage, AppRoute } from "atomic";
import { documentOutline, homeOutline } from "ionicons/icons";
import Home from "../pages/Home";
import { ExampleSubMenu } from "./ExampleSubMenu";
import ExampleForm from "./FormExample";

export const submenuRoute: AppRoute = {
    icon: documentOutline, path: "/submenu/", exact: true, title: "Submenu", component: AppPage, nested: [
        { icon: documentOutline, path: "/submenu/form2", title: "Form2", component: ExampleForm, exact: true },
        { icon: documentOutline, path: "/submenu/form2", title: "Form2", component: ExampleForm, exact: true },
        { icon: documentOutline, path: "/submenu/form2", title: "Form2", component: ExampleForm, exact: true }
    ]
}
const routes = [
    { icon: homeOutline, path: "/", title: "", component: Home, exact: true },
    { icon: documentOutline, path: "/form", title: "Form", component: ExampleForm, exact: true },
    { icon: documentOutline, path: "/submenu", title: "Submenu", component: ExampleSubMenu, },
]
export default routes;