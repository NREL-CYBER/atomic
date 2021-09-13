import { composeStore } from "store";
import AddressSchema from "../schemas/address.schema.json";
import { AppConfig } from "../util/AppConfig";
import routes from "./routes";
import { ExampleBottomBar } from "./ExampleBottomBar";
import { ExampleSearchWidget } from "./ExampleSearchWidget";


type Address = {
    post_office_box?: string
    street_address?: string
    locality: string
    region: string
    country_name: string,
    street_view: string
}


const useAddress = composeStore<Address>(
    { schema: AddressSchema, definition: "address_book" }
);


export { useAddress };

const ExampleConfig: AppConfig = {
    title: "Atomic Example",
    appId: "nrel.atomic.example",
    search: ExampleSearchWidget,
    version: "3.6.9",
    routes,
    completion: {
        default: "unlocked",
    },
    cache: {
        atomic: { address: useAddress }
    },
    settings: {
        show: {
            server: false,
        }
    },
    mainMenu: {
        sections: { example: routes.filter(x => x.path !== "/") },
        fixed: true
    },
    darkMode: false,
    bottomBar: { start: ExampleBottomBar },
    about: {
        hidden: true,
        component: "example application information...."
    },
    serialization: {
        mode: "local",
        authentication: {
            provider: "email"
        },
        encryption: "AES256",
    }
}
export default ExampleConfig;