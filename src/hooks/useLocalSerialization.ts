import { get, set } from 'idb-keyval';
import { Store } from 'store';
import create from "zustand";
import { AppSerializationConfig } from '../util/AppConfig';



export type SynchronizationContext = {
    provider: string,
    synchronize<T>(serialization: AppSerializationConfig, namespace: string, store: () => Store<T>, uid: string, onComplete?: () => void): void;
}


/**
 * Serialize cache to indexDB any time it changes via store listener
 * */
const useIndexDBStorage = create<SynchronizationContext>(() => ({
    provider: "index-db",
    async synchronize<T>(serialization: AppSerializationConfig, namespace: string, store: () => Store<T>, uid: string = "", onComplete?: () => void) {

        const collection_key = namespace + "_" + store().collection;
        const collection_workspace_key = collection_key + "_workspace";
        const collection_active_key = collection_key + "_active";

        const serialized_store_string = await get(collection_key);
        try {
            const store_records = JSON.parse(serialized_store_string) as Record<string, any>;
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


        store().addListener((_, data, status) => {
            return new Promise((resolve, reject) => {
                switch (status) {
                    case "workspacing":
                        const exported_workspace = store().exportWorkspace();
                        exported_workspace ? set(collection_workspace_key, exported_workspace).then(() => {
                            resolve("workspace-saved");
                        }).catch(reject) : reject("workspace-empty");
                        break;
                    case "inserting":
                    case "removing":
                    case "updating":
                        set(collection_key, store().export()).then(() => {
                            resolve("update-saved")
                        }).catch(reject);
                        break;
                    case "activating":
                        set(collection_active_key, store().active).then(() => {
                            resolve("active-element-saved")
                        }).catch(reject)
                        break;
                }
            })
        });
        onComplete && onComplete();
    }
}));


export default useIndexDBStorage;