import "store/tests/groceries-store.test";
import rootRoute from "./routes";
const config = {
  rootRoute: rootRoute,
  sections: {
    forms: rootRoute.nested
  }
};
export default config;