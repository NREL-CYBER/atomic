import axios from "axios";
import { Store } from "store";
import create from "zustand";
import { AppSerializationConfig } from "../util/AppConfig";
import { get, set } from 'idb-keyval';


export type restSynchronizationContext = {
    authenticate(
        email: string, password: string, action: "login" | "create",
        onLoginSuccess: (uid: string) => void, onLoginFail: () => void): void;
    synchronize<T>(namespace: string, store: () => Store<T>, uid: string): void;
}


/**
 * Observe an Entity collection in rest storage
 */
export const useRestSerializeation = (serializaion: AppSerializationConfig) => (create<restSynchronizationContext>((_, restStorage) => ({
    authenticate: (email, password, action, onLoginSuccess, onLoginFail) => {
    },
    async synchronize<T>(namespace: string, store: () => Store<T>, uid: string) {
        const endpoint = serializaion.rest!.endpoint;
        const collection_key = namespace + "_" + store().collection;
        const collection_workspace_key = "_workspace_" + uid;
        const collection_active_key = "_active_" + uid;

        // Remote procedure call to rest server
        const rpc = (method: "get" | "delete", key?: string) => {
            const item_key = collection_key + "/" + key || ""
            return new Promise<string>(((resolve, reject) => {
                axios({
                    baseURL: endpoint,
                    method,
                    url: item_key
                }).then(({ data }) => {
                    resolve(data)
                }).catch(reject)
            }))
        }
        console.log(endpoint)
        // Remote procedure call to push data to rest server
        const rpcWithData = (method: "put" | "post", data: string, key?: string) => {
            const item_key = collection_key + "/" + key || ""
            return new Promise<string>(((resolve, reject) => {
                axios({
                    baseURL: endpoint,
                    method,
                    data,
                    url: item_key
                }).then(({ data }) => {
                    resolve(data)
                }).catch(reject)
            }))
        }

        const insert = (key: string, value: string) => rpcWithData("put", value, key)
        const remove = (key: string) => rpc("delete", key)
        const entries = () => rpc("get")

        let serialized_store_string = "";
        let store_records: Record<string, any> = {};
        try {
            serialized_store_string = await entries()
            store_records = JSON.parse(serialized_store_string) as Record<string, any>;
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
            const workspace_string = await get(collection_workspace_key)
            const store_workspace = workspace_string && JSON.parse(workspace_string) as T;;

            store().setWorkspaceInstance(store_workspace);

        } catch (error) {
            console.log(error);
        }
        try {
            const active_string = await get(collection_active_key)
            active_string && store().setActive(active_string);

        } catch (error) {
            console.log(error);
        }


        store().addListener((key, data, status) => {
            switch (status) {
                case "workspacing":
                    console.log("update workspace", collection_workspace_key)
                    set(collection_workspace_key, store().exportWorkspace());
                    break;
                case "inserting":
                case "updating":
                    console.log("update workspace", key)
                    insert(key, JSON.stringify(data)).catch(() => {
                        store().setStatus("erroring")
                    })
                    break;
                case "removing":
                    remove(key).catch(() => {
                        store().setStatus("erroring")
                    })

                    break;
                case "activating":
                    set(collection_active_key, store().active!)
                    break;
            }


        });
    }
})))()
