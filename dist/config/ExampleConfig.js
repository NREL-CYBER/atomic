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
  schema: {},
  definition: "identity",
  paginate: ({
    page,
    pageSize
  }, options) => {
    return new Promise((resolve, reject) => {
      const start = page * pageSize;
      const end = page * pageSize + pageSize;
      const queryType = options.type;
      const queryKillChain = options.kill_chain_phase;
      const queryAny = options.query ? options.query.join("").toLowerCase() : undefined;
      const objects = queryType && queryType.length > 0 ? Attack10.objects.filter(x => queryType.includes(x.type)) : Attack10.objects;
      const filteredObjects = queryAny ? objects.filter(x => x.name?.toLowerCase()?.includes(queryAny) || x.description?.toLowerCase()?.includes(queryAny)) : objects;
      resolve(filteredObjects.slice(start, end));
    });
  }
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