import { get, set } from 'idb-keyval';
import { Store } from 'store';
import create from "zustand";



export type localSynchronizationContext = {
    authenticate(email: string, password: string, action: "login" | "create", onLoginSuccess: (uid: string) => void): void;
    synchronize<T>(namespace: string, store: () => Store<T>, uid: string): void;
}


/**
 * Observe an Entity collection in cloud storage
 */
const useIndexDBStorage = create<localSynchronizationContext>(() => ({
    authenticate: (email: string, password: string, action, onLoginSuccess: (uid: string) => void) => {
        action === "login" && console.log("login");
        action === "create" && console.log("create");
    },
    async synchronize<T>(namespace: string, store: () => Store<T>, uid: string) {
        const collection_key = namespace + "-" + store().collection;
        const collection_workspace_key = collection_key + "-workspace";
        const serialized_store_string = await get(collection_key);
        try {
            const store_records = JSON.parse(serialized_store_string) as Record<string, any>;
            store().import(store_records, false);

        } catch (error) {
            console.log(error, serialized_store_string);
        }
        const workspace_string = await get(collection_workspace_key)
        try {
            const store_workspace = workspace_string && JSON.parse(workspace_string) as T;;
            store().setWorkspaceInstance(store_workspace);

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
            }


        });
    }
}));


export default useIndexDBStorage;