import { composeStore } from "store";
import AddressSchema from "../schemas/address.schema.json";
import routes from "./routes";
import { ExampleBottomBar } from "./ExampleBottomBar";
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
  darkMode: false,
  bottomBar: {
    start: ExampleBottomBar
  },
  about: "example application information....",
  serialization: {
    mode: "local",
    encryption: "plaintext" // rest: {
    //     endpoint: "http://1lv11rmadm01:8888/api/v1/",
    // }

  }
};
export default ExampleConfig;