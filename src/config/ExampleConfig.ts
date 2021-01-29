import { AppConfig } from "../util/AppConfig";
import rootRoute from "./routes";
import { composeStore } from "store"
import { RootSchemaObject } from "validator";
import AddressSchema from "../schemas/address.schema.json"
import routes from "./routes";

type Address = {
    post_office_box?: string
    street_address?: string
    locality: string
    region: string
    country_name: string
}


const useAddress = composeStore<Address>(AddressSchema);

export { useAddress };

const ExampleConfig: AppConfig = {
    routes,
    sections: { forms: [routes[1]] },
    cache: {
        atomic: {
            addresses: useAddress
        }
    },
    darkMode: true,
    serialization: {
        mode: "cloud",
        encryption: "plaintext",
        cloud: {
            provider: {
                firebase: {
                    apiKey: "AIzaSyCpu67xdMKRxZOpN-FGxXH_wmLhqvAUFQM",
                    authDomain: "cyber-risk-manager.firebaseapp.com",
                    databaseURL: "https://cyber-risk-manager.firebaseio.com",
                    projectId: "cyber-risk-manager",
                    storageBucket: "cyber-risk-manager.appspot.com",
                    messagingSenderId: "859144297245",
                    appId: "1:859144297245:web:860111e3fbc173327e9ff4",
                    measurementId: "G-T9PQXBYXR7",
                },
                authentication: {
                    provider: "email",
                    required: true
                }
            }
        }
    }
}
export default ExampleConfig;