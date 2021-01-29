import { documentOutline, homeOutline } from "ionicons/icons";
import Home from "../pages/Home";
import ExampleForm from "./FormExample";

const routes = [
    { icon: homeOutline, path: "/", title: "", component: Home },
    { icon: documentOutline, path: "/Form", title: "Form", component: ExampleForm }
]
export default routes;