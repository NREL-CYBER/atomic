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

        const entries = await get(collection_key) as [];
        const workspace = await get(collection_workspace_key)

        store().setWorkspace((workspaceDraft) => {
            Object.entries(workspace).forEach(([key, value]) => {
                (workspaceDraft as any)[key] = value;
            })
        });

        entries.forEach(entry => {
            store().insert(entry);
        })
        store().addListener((_, data, status) => {
            switch (status) {
                case "workspace-update":
                    set(collection_workspace_key, data);
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