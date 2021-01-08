import { homeOutline } from "ionicons/icons";
import Home from "../pages/Home";
const rootRoute = {
  icon: homeOutline,
  path: "/",
  title: "home",
  component: Home,
  nested: [{
    icon: homeOutline,
    path: "/OK",
    title: "OK",
    component: Home
  }, {
    icon: homeOutline,
    path: "/test",
    title: "TEST",
    component: Home
  }, {
    icon: homeOutline,
    path: "/Other",
    title: "OTHER",
    component: Home
  }, {
    icon: homeOutline,
    path: "/form-composer",
    title: "OTHER",
    component: Home
  }]
};
export default rootRoute;