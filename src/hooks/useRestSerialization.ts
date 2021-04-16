import { AppRestConfig } from "../util/AppConfig";
import { Store } from "store";
import create from "zustand";
import axios from "axios"


export type restSynchronizationContext = {
    endpoint: string;
    authenticate(
        email: string, password: string, action: "login" | "create",
        onLoginSuccess: (uid: string) => void, onLoginFail: () => void): void;
    synchronize<T>(namespace: string, store: () => Store<T>, uid: string): void;
}


/**
 * Observe an Entity collection in rest storage
 */
export const useRestSerializeation = (restConfig: AppRestConfig) => (create<restSynchronizationContext>((set, restStorage) => ({
    endpoint: restConfig.provider.endpoint,
    authenticate: (email, password, action, onLoginSuccess, onLoginFail) => {
    },
    async synchronize<T>(namespace: string, store: () => Store<T>, uid: string) {
        const collection_key = namespace + "-" + store().collection;
        const collection_workspace_key = collection_key + "-workspace";
        const collection_active_key = collection_key + "-active";
        const get = (key: string) => {
            return new Promise<string>((resolve => {
                axios.get(restStorage().endpoint + "/" + collection_key + "/" + key).then(({ data }) => {
                    resolve(data)
                })
            }))
        }
        const set = (key: string, value: string) => {
            return new Promise<string>((resolve => {
                axios.post(restStorage().endpoint + "/" + collection_key + "/", key).then(({ data }) => {
                    resolve(data)
                })
            }))
        }
        const remove = (key: string) => {
            return new Promise<string>((resolve => {
                axios.delete(restStorage().endpoint + "/" + collection_key + "/" + key).then(({ data }) => {
                    resolve(data)
                })
            }))
        }

        const serialized_store_string = await get(collection_key);
        try {
            const store_records = JSON.parse(serialized_store_string) as Record<string, any>;
            store().import(store_records, false);

        } catch (error) {
            //          console.log(error, serialized_store_string);
        }
        const workspace_string = await get(collection_workspace_key)
        try {
            const store_workspace: T | "" = workspace_string && JSON.parse(workspace_string) as T;;
            store_workspace !== "" && store().setWorkspaceInstance(store_workspace);

        } catch (error) {
            //            console.log(error, workspace_string);
        }

        store().addListener((key, data, status) => {
            switch (status) {
                case "workspacing":
                    set(collection_workspace_key, store().exportWorkspace()).catch(() => {
                        store().setStatus("erroring")
                    })
                    break;
                case "inserting":
                    set(key, JSON.stringify(data)).catch(() => {
                        store().setStatus("erroring")
                    })

                    break;
                case "removing":
                    remove(key).catch(() => {
                        store().setStatus("erroring")
                    })

                    break;
                case "activating":
                    set(collection_active_key, store().active!).catch(() => {
                        store().setStatus("erroring")
                    })

                    break;
            }


        });
    }
})))()
