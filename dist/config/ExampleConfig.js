import { composeStore } from "store";
import AddressSchema from "../schemas/address.schema.json";
import routes from "./routes";
const useAddress = composeStore({
  schema: AddressSchema
});
export { useAddress };
const ExampleConfig = {
  title: "Atomic Example",
  version: "1.3.0",
  sections: {
    nice: routes
  },
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
  darkMode: true,
  about: "example application information....",
  serialization: {
    mode: "rest",
    encryption: "plaintext",
    authentication: {
      provider: "email"
    },
    rest: {
      endpoint: "http://1lv11rmadm01:8888/api/v1/"
    } // cloud: {
    //     provider: {
    //         firebase: {
    //             apiKey: "AIzaSyCpu67xdMKRxZOpN-FGxXH_wmLhqvAUFQM",
    //             authDomain: "cyber-risk-manager.firebaseapp.com",
    //             databaseURL: "https://cyber-risk-manager.firebaseio.com",
    //             projectId: "cyber-risk-manager",
    //             storageBucket: "cyber-risk-manager.appspot.com",
    //             messagingSenderId: "859144297245",
    //             appId: "1:859144297245:web:860111e3fbc173327e9ff4",
    //             measurementId: "G-T9PQXBYXR7",
    //         },
    //         authentication: {
    //             provider: "email",
    //             required: true
    //         }
    //     }
    // }

  }
};
export default ExampleConfig;