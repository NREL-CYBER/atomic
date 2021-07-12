import { composeStore } from "store";
import AddressSchema from "../schemas/address.schema.json";
import routes from "./routes";
import { ExampleBottomBar } from "./ExampleBottomBar";
const useAddress = composeStore({
  schema: AddressSchema,
  definition: "plan_of_action_and_milestones"
});
export { useAddress };
const ExampleConfig = {
  title: "Atomic Example",
  appId: "nrel.atomic.example",
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
      address: useAddress
    }
  },
  darkMode: false,
  bottomBar: {
    start: ExampleBottomBar,
    hideNext: true
  },
  about: "example application information....",
  serialization: {
    mode: "local",
    encryption: "AES256",
    authentication: {
      provider: "email"
    } // rest: {
    //     endpoint: "http://1lv11rmadm01:8888/api/v1/",
    // }

  }
};
export default ExampleConfig;