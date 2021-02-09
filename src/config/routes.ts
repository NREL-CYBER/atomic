import { documentOutline, homeOutline, cloudUploadOutline } from "ionicons/icons";
import Home from "../pages/Home";
import ExampleForm from "./FormExample";
import UploadExample from "../pages/UploadExample";

const routes = [
    { icon: homeOutline, path: "/", title: "", component: Home },
    { icon: documentOutline, path: "/Form", title: "Form", component: ExampleForm },
    { icon: cloudUploadOutline, path: "/Uploader", title: "Uploader", component: UploadExample }
]
export default routes;