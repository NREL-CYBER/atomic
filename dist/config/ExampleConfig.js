import { composeStore } from "store";
import AddressSchema from "../schemas/address.schema.json";
import routes from "./routes";
import { ExampleBottomBar } from "./ExampleBottomBar";
import { ExampleSearchWidget } from "./ExampleSearchWidget";
import Attack10 from "./ATTACK10.json";
const useAddress = composeStore({
  schema: AddressSchema,
  definition: "address"
});
export const useAttack = composeStore({
  initial: Attack10.objects.map(x => ({
    [x.id]: { ...x
    }
  })).reduce((a, b) => ({ ...a,
    ...b
  }), {}),
  schema: {},
  definition: "identity"
});
export { useAddress };
const ExampleConfig = {
  title: "Atomic Example",
  appId: "nrel.atomic.example",
  search: ExampleSearchWidget,
  version: "3.6.9",
  routes,
  completion: {
    default: "unlocked"
  },
  cache: {
    atomic: {
      attack: useAttack,
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
    }
  },
  darkMode: false,
  bottomBar: {
    start: ExampleBottomBar
  },
  about: {
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