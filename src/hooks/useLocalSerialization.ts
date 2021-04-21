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
        const collection_active_key = collection_key + "-active";
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
    }
}));


export default useIndexDBStorage;