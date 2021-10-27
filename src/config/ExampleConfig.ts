import { composeStore, Store } from "store";
import AddressSchema from "../schemas/address.schema.json";
import { AppConfig } from "../util/AppConfig";
import routes from "./routes";
import { ExampleBottomBar } from "./ExampleBottomBar";
import { ExampleSearchWidget } from "./ExampleSearchWidget";
import Attack10 from "./ATTACK10.json"
import { UseBoundStore, UseStore } from "zustand";

type Address = {
    post_office_box?: string
    street_address?: string
    locality: string
    region: string
    country_name: string,
    street_view: string
}


const useAddress: UseBoundStore<Store<Address>> = composeStore<Address>(
    { schema: AddressSchema, definition: "address" }
);
export interface MitreNode extends Record<string, any> { type: string, name: string, id: string }
export const useAttack = composeStore<MitreNode>(
    {
        initial: Attack10.objects.map(x => ({ [x.id]: { ...x } })).reduce((a, b) => ({ ...a, ...b }), {}),
        schema: {}, definition: "identity",
    },
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
        atomic: {
            attack: useAttack,
            address: useAddress
        }
    },
    settings: {
        show: {
            server: false,
        }
    },
    mainMenu: {
        sections: {
            example:
                routes.filter(x => x.path !== "/")
        },
    },
    darkMode: false,
    bottomBar: { start: ExampleBottomBar },
    about: {
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