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
    const collection_workspace_key = collection_key + "-workspace";
    const serialized_store_string = await get(collection_key);

    try {
      const store_records = JSON.parse(serialized_store_string);
      store_records && Object.entries(store_records).forEach(([key, value]) => {
        store().insert(value, key);
      });
    } catch (error) {
      console.log(error, serialized_store_string);
    }

    const workspace_string = await get(collection_workspace_key);

    try {
      const store_workspace = workspace_string && JSON.parse(workspace_string);
      ;
      store().setWorkspace(workspaceDraft => {
        store_workspace && Object.entries(store_workspace).forEach(([key, value]) => {
          workspaceDraft[key] = value;
        });
      });
    } catch (error) {
      console.log(error, workspace_string);
    }

    store().addListener((_, data, status) => {
      switch (status) {
        case "workspace-update":
          set(collection_workspace_key, store().exportWorkspace());
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