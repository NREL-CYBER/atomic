import { composeStore } from "store";
import AddressSchema from "../schemas/address.schema.json";
import routes from "./routes";
const useAddress = composeStore({
  schema: AddressSchema
});
export { useAddress };
const ExampleConfig = {
  title: "Atomic Example",
  version: "0.4.4",
  routes,
  sections: {
    forms: [routes[1], routes[2]]
  },
  cache: {
    atomic: {
      addresses: useAddress
    }
  },
  darkMode: false,
  serialization: {
    mode: "local",
    encryption: "plaintext" // cloud: {
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