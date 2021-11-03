import { composeStore } from "store";
import AddressSchema from "../schemas/address.schema.json";
import Attack10 from "./ATTACK10.json";
import { ExampleBottomBar } from "./ExampleBottomBar";
import { ExampleSearchWidget } from "./ExampleSearchWidget";
import routes from "./routes";
const useAddress = composeStore({
  schema: AddressSchema,
  definition: "pallete_element",
  identifier: "name"
});
export const useAttack = composeStore({
  identifier: "id",
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
    mode: "rest",
    authentication: {
      provider: {
        oAuthEndPoint: "http://10.20.49.90:7777/auth/github",
        type: "oauth",
        name: "github"
      }
    },
    rest: {
      endpoint: "http://10.20.49.90:7777/api/v1"
    }
  }
};
export default ExampleConfig;