import { composeStore, Store } from "store";
import AddressSchema from "../schemas/address.schema.json";
import { AppConfig } from "../util/AppConfig";
import routes from "./routes";
import { ExampleBottomBar } from "./ExampleBottomBar";
import { ExampleSearchWidget } from "./ExampleSearchWidget";
import Attack10 from "./ATTACK10.json"
import { UseStore } from "zustand";

type Address = {
    post_office_box?: string
    street_address?: string
    locality: string
    region: string
    country_name: string,
    street_view: string
}


const useAddress: UseStore<Store<Address>> = composeStore<Address>(
    { schema: AddressSchema, definition: "address" }
);
interface MitreNode { type: string, name: string, id: string }
export const useAttack = composeStore<MitreNode>(
    {
        schema: {}, definition: "identity",
        paginate: ({ page, pageSize }, options) => {
            return new Promise<MitreNode[]>((resolve, reject) => {
                const start = page * pageSize
                const end = page * pageSize + pageSize;
                const queryType: string[] | undefined = options.type
                const queryKillChain: string[] | undefined = options.kill_chain_phase
                const queryAny: string | undefined = options.query ? options.query.join("").toLowerCase() : undefined
                const objects = queryType && queryType.length > 0 ? Attack10.objects.filter(x => queryType.includes(x.type)) : Attack10.objects
                const filteredObjects = queryAny ? objects.filter(x => x.name?.toLowerCase()?.includes(queryAny) || x.description?.toLowerCase()?.includes(queryAny)) : objects
                resolve(filteredObjects.slice(start, end) as MitreNode[]);
            })
        }
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