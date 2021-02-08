import { get, set } from 'idb-keyval';
import create from "zustand";

/**
 * Observe an Entity collection in cloud storage
 */
const useIndexDBStorage = create(() => ({
  authenticate: (email, password, action, onLoginSuccess) => {
    action === "login" && console.log("login");
    action === "create" && console.log("create");
  },

  async synchronize(namespace, store, uid) {
    const collection_key = namespace + "-" + store().collection;
    const collection_partial_key = collection_key + "-partial";
    const entries = await get(collection_key);
    const partial = await get(collection_partial_key);
    store().setPartial(partialDraft => {
      Object.entries(partial).forEach(([key, value]) => {
        partialDraft[key] = value;
      });
    });
    entries.forEach(entry => {
      store().insert(entry);
    });
    store().addListener((_, data, status) => {
      switch (status) {
        case "partial-update":
          set(collection_partial_key, data);
          break;

        case "inserting":
        case "removing":
          set(collection_key, store().export());
          break;
      }
    });
  }

}));
export default useIndexDBStorage;