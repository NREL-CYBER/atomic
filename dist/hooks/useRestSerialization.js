import axios from "axios";
import create from "zustand";
import { get, set } from 'idb-keyval';

const makeRpcPath = (collection, key = "") => {
  const path = collection + "/" + key;
  return path;
}; // Remote procedure call to rest server


const rpc = (endpoint, collection, method, key) => {
  return new Promise((resolve, reject) => {
    axios({
      baseURL: endpoint,
      method,
      url: makeRpcPath(collection, key)
    }).then(({
      data
    }) => {
      resolve(data);
    }).catch(reject);
  });
}; // Remote procedure call to push data to rest server


const rpcWithData = (endpoint, collection, method, data, key) => {
  return new Promise((resolve, reject) => {
    axios({
      baseURL: endpoint,
      method,
      data,
      url: makeRpcPath(collection, key)
    }).then(({
      data
    }) => {
      resolve(data);
    }).catch(reject);
  });
};
/**
 * Observe an Entity collection in rest storage
 */


export const useRestSerializeation = create((_, restStorage) => ({
  provider: "rest",

  async synchronize(serialization, namespace, store, uid, onComplete) {
    const uid_prefix = uid.length > 0 ? uid + "_" : "";
    const collection_key = uid_prefix + namespace + "_" + store().collection;
    const collection_workspace_key = uid_prefix + collection_key + "_workspace";
    const collection_active_key = uid_prefix + collection_key + "_active";

    if (typeof serialization.rest === "undefined") {
      throw new Error("Please Set Rest Endpoint");
    }

    const endpoint = serialization.rest.endpoint;

    const insert = (collection, key, value) => rpcWithData(endpoint, collection, "put", value, key);

    const remove = (collection, key) => rpc(endpoint, collection, "delete", key);

    const entries = () => rpc(endpoint, collection_key, "get");

    let store_records = {};

    try {
      store_records = await entries();
      await store().import(store_records, false);
    } catch (error) {
      console.log(error);
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
      return new Promise(resolve => {
        switch (status) {
          case "workspacing":
            set(collection_workspace_key, store().exportWorkspace());
            break;

          case "inserting":
          case "updating":
            insert(collection_key, key, JSON.stringify(data)).catch(() => {
              store().setStatus("erroring");
            });
            break;

          case "removing":
            remove(collection_key, key).catch(() => {
              store().setStatus("erroring");
            });
            break;

          case "activating":
            set(collection_active_key, store().active);
            break;
        }

        resolve(status);
      });
    });
    onComplete && onComplete();
  }

}));