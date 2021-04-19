import axios from "axios";
import create from "zustand";
import { get, set } from 'idb-keyval';

/**
 * Observe an Entity collection in rest storage
 */
export const useRestSerializeation = serializaion => create((_, restStorage) => ({
  authenticate: (email, password, action, onLoginSuccess, onLoginFail) => {},

  async synchronize(namespace, store, uid) {
    const endpoint = serializaion.rest.endpoint;
    const collection_key = namespace + "-" + store().collection;
    const collection_workspace_key = "workspace-" + uid;
    const collection_active_key = "active-" + uid; // Remote procedure call to rest server

    const rpc = (method, key) => {
      return new Promise((resolve, reject) => {
        axios({
          baseURL: endpoint,
          method,
          url: collection_key + key ? "/" + key : ""
        }).then(({
          data
        }) => {
          resolve(data);
        }).catch(reject);
      });
    };

    console.log(endpoint); // Remote procedure call to push data to rest server

    const rpcWithData = (method, data, key) => {
      return new Promise((resolve, reject) => {
        axios({
          baseURL: endpoint,
          method,
          data,
          url: collection_key + key ? "/" + key : ""
        }).then(({
          data
        }) => {
          resolve(data);
        }).catch(reject);
      });
    };

    const insert = (key, value) => rpcWithData("put", value, key);

    const remove = key => rpc("delete", key);

    const entries = () => rpc("get");

    let serialized_store_string = "";
    let store_records = {};

    try {
      serialized_store_string = await entries();
      store_records = JSON.parse(serialized_store_string);
      store().import(store_records, true);
    } catch (error) {
      console.log(error);
    }

    try {
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

    store().addListener((key, data, status) => {
      switch (status) {
        case "workspacing":
          set(collection_workspace_key, store().exportWorkspace());
          break;

        case "inserting":
        case "updating":
          insert(key, JSON.stringify(data)).catch(() => {
            store().setStatus("erroring");
          });
          break;

        case "removing":
          remove(key).catch(() => {
            store().setStatus("erroring");
          });
          break;

        case "activating":
          set(collection_active_key, store().active);
          break;
      }
    });
  }

}))();