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
    { schema: AddressSchema }
);


export { useAddress };

const ExampleConfig: AppConfig = {
    title: "Atomic Example",
    version: "1.3.0",
    sections: { nice: routes },
    routes,
    completion: {
        default: "unlocked",
        disabled: true
    },
    cache: {
        atomic: {
            addresses: useAddress
        }
    },
    darkMode: false,
    bottomBar: { start: ExampleBottomBar },
    about: "example application information....",
    serialization: {
        mode: "local",
        encryption: "plaintext",
        // rest: {
        //     endpoint: "http://1lv11rmadm01:8888/api/v1/",
        // }
    }
}
export default ExampleConfig;