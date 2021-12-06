import { composeStore, Store } from "store";
import { UseStore } from "zustand";
import AddressSchema from "../schemas/address.schema.json";
import { AppConfig } from "../util/AppConfig";
import Attack10 from "./ATTACK10.json";
import { ExampleBottomBar } from "./ExampleBottomBar";
import { ExampleSearchWidget } from "./ExampleSearchWidget";
import routes from "./routes";

type PalleteItem = {
    name: string,
    type: string,
    r: number,
    g: number,
    b: number
}

const useAddress: UseStore<Store<PalleteItem>> = composeStore<PalleteItem>(
    { schema: AddressSchema, definition: "pallete_element", identifier: "name" }
);
export interface MitreNode extends Record<string, any> { type: string, name: string, id: string }
export const useAttack = composeStore<MitreNode>(
    {
        identifier: "id",
        initial: Attack10.objects.map(x => ({ [x.id]: { ...x } })).reduce((a, b) => ({ ...a, ...b }), {}),
        schema: {
            $id:"inline-mitre",
            type: "object",
            definitions: {
                identity: {
                    $id: "#/definitions/identity",
                    type: "object",
                    title: "Identity",
                    properties: {
                        id: {
                            type: 'string'
                        },
                        name: {
                            type: "string"
                        },
                        type: {
                            type: "string",
                            enum: ["attack-pattern", 'malware']
                        }

                    }
                }
            }
        }, definition: "identity",
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
        mode: "local"
    }
}
export default ExampleConfig;