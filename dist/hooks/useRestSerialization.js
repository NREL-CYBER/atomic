import create from "zustand";
import axios from "axios";

/**
 * Observe an Entity collection in rest storage
 */
export const useRestSerializeation = restConfig => create((set, restStorage) => ({
  endpoint: restConfig.provider.endpoint,
  authenticate: (email, password, action, onLoginSuccess, onLoginFail) => {},

  async synchronize(namespace, store, uid) {
    const collection_key = namespace + "-" + store().collection;
    const collection_workspace_key = collection_key + "-workspace";
    const collection_active_key = collection_key + "-active";

    const get = key => {
      return new Promise(resolve => {
        axios.get(restStorage().endpoint + "/get/" + key).then(({
          data
        }) => {
          resolve(data);
        });
      });
    };

    const set = (key, value) => {
      return new Promise(resolve => {
        axios.post(restStorage().endpoint + "/set/" + key, value).then(({
          data
        }) => {
          resolve(data);
        });
      });
    };

    const serialized_store_string = await get(collection_key);

    try {
      const store_records = JSON.parse(serialized_store_string);
      store().import(store_records, false);
    } catch (error) {
      console.log(error, serialized_store_string);
    }

    const workspace_string = await get(collection_workspace_key);

    try {
      const store_workspace = workspace_string && JSON.parse(workspace_string);
      ;
      store_workspace !== "" && store().setWorkspaceInstance(store_workspace);
    } catch (error) {
      console.log(error, workspace_string);
    }

    store().addListener((_, data, status) => {
      switch (status) {
        case "workspacing":
          set(collection_workspace_key, store().exportWorkspace());
          break;

        case "inserting":
        case "removing":
          set(collection_key, store().export());
          break;

        case "activating":
          set(collection_active_key, store().active);
          break;
      }
    });
  }

}))();