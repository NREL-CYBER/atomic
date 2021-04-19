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
    const collection_active_key = collection_key + "-active";
    const serialized_store_string = await get(collection_key);

    try {
      const store_records = JSON.parse(serialized_store_string);
      store().import(store_records, false);
    } catch (error) {
      console.log(error, serialized_store_string);
    }

    try {
      const workspace_string = await get(collection_workspace_key);
      const store_workspace = workspace_string && JSON.parse(workspace_string);
      ;
      store().setWorkspaceInstance(store_workspace);
    } catch (error) {
      console.log(error);
    }

    try {
      const active_string = await get(collection_active_key);
      active_string && store().setActive(active_string);
    } catch (error) {
      console.log(error);
    }

    store().addListener((_, data, status) => {
      switch (status) {
        case "workspacing":
          set(collection_workspace_key, store().exportWorkspace());
          break;

        case "inserting":
        case "removing":
        case "updating":
          set(collection_key, store().export());
          break;

        case "activating":
          set(collection_active_key, store().active);
          break;
      }
    });
  }

}));
export default useIndexDBStorage;