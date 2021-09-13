import { composeStore } from "store";
import AddressSchema from "../schemas/address.schema.json";
import routes from "./routes";
import { ExampleBottomBar } from "./ExampleBottomBar";
import { ExampleSearchWidget } from "./ExampleSearchWidget";
const useAddress = composeStore({
  schema: AddressSchema,
  definition: "address_book"
});
export { useAddress };
const ExampleConfig = {
  title: "Atomic Example",
  appId: "nrel.atomic.example",
  search: ExampleSearchWidget,
  version: "3.3.3",
  routes,
  completion: {
    default: "unlocked"
  },
  cache: {
    atomic: {
      address: useAddress
    }
  },
  settings: {
    show: {
      server: false
    }
  },
  mainMenu: {
    sections: {
      example: routes.filter(x => x.path !== "/")
    },
    fixed: true
  },
  darkMode: false,
  bottomBar: {
    start: ExampleBottomBar
  },
  about: {
    hidden: true,
    component: "example application information...."
  },
  serialization: {
    mode: "local",
    authentication: {
      provider: "email"
    },
    encryption: "AES256"
  }
};
export default ExampleConfig;