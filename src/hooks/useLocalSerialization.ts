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
        const collection_partial_key = collection_key + "-partial";

        const entries = await get(collection_key) as [];
        const partial = await get(collection_partial_key)

        store().setPartial((partialDraft) => {
            Object.entries(partial).forEach(([key, value]) => {
                (partialDraft as any)[key] = value;
            })
        });

        entries.forEach(entry => {
            store().insert(entry);
        })
        store().addListener((_, data, status) => {
            switch (status) {
                case "partial-update":
                    set(collection_partial_key, data);
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