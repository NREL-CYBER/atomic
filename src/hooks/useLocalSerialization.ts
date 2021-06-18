import { get, set } from 'idb-keyval';
import { Store } from 'store';
import create from "zustand";
import { AppSerializationConfig } from '../util/AppConfig';



export type SynchronizationContext = {
    synchronize<T>(serialization: AppSerializationConfig, namespace: string, store: () => Store<T>, uid: string, onComplete?: () => void): void;
}


/**
 * Serialize cache to indexDB any time it changes via store listener
 * */
const useIndexDBStorage = create<SynchronizationContext>(() => ({
    async synchronize<T>(serialization: AppSerializationConfig, namespace: string, store: () => Store<T>, uid: string = "", onComplete?: () => void) {
        const uid_prefix = uid === "" ? uid + "-" : ""

        const collection_key = uid_prefix + namespace + "-" + store().collection;
        const collection_workspace_key = uid_prefix + collection_key + "-workspace";
        const collection_active_key = uid_prefix + collection_key + "-active";

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
                    set(collection_active_key, store().active)
                    break;
            }
        });
        onComplete && onComplete();
    }
}));


export default useIndexDBStorage;