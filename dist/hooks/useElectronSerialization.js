import ElectronStore from "electron-store";
import create from "zustand";

/**
 * Observe an Entity collection in electron storage
 */
const useElectronSerialization = create(() => ({
  async synchronize(serialization, namespace, store, uid = "", onComplete) {
    const {
      get,
      set
    } = new ElectronStore();
    const uid_prefix = uid === "" ? uid + "_" : "";
    const collection_key = uid_prefix + namespace + "_" + store().collection;
    const collection_workspace_key = uid_prefix + collection_key + "_workspace";
    const collection_active_key = uid_prefix + collection_key + "_active";
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
      store_workspace !== "" && store().setWorkspaceInstance(store_workspace);
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
          const exported_workspace = store().exportWorkspace();
          exported_workspace && set(collection_workspace_key, exported_workspace);
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
    onComplete && onComplete();
  }

}));
export default useElectronSerialization;