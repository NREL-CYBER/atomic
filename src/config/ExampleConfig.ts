import { composeStore } from "store";
import AddressSchema from "../schemas/address.schema.json";
import { AppConfig } from "../util/AppConfig";
import routes from "./routes";
import { ExampleBottomBar } from "./ExampleBottomBar";


type Address = {
    post_office_box?: string
    street_address?: string
    locality: string
    region: string
    country_name: string,
    street_view: string
}


const useAddress = composeStore<Address>(
    { schema: AddressSchema, definition: "address" }
);


export { useAddress };

const ExampleConfig: AppConfig = {
    title: "Atomic Example",
    appId: "nrel.atomic.example",
    version: "3.3.3",
    sections: { nice: routes },
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
    darkMode: false,
    bottomBar: { start: ExampleBottomBar },
    about: "example application information....",
    serialization: {
        mode: "local",
        encryption: "AES256",
    }
}
export default ExampleConfig;