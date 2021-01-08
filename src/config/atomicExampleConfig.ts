import { documentOutline } from "ionicons/icons";
import FormExamples from "../pages/FormExamples";
import rootRoute from "./routes";
import { AppConfig } from "../util/AppConfig";


const config: AppConfig = {
    rootRoute: rootRoute,
    sections: { forms: [{ icon: documentOutline, title: "form composer", path: "/form-composer", component: FormExamples }] },
    glossary: { records: { atomic: "A cool application framework" } },
    completion: {},
    schemas: []
}
export default config;