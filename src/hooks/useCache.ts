import create, { UseStore } from "zustand";
import { AppCacheIndex } from "../state/AppCache";
import { Store } from "store";



/**
 * Type that defines what the useNotifications hook can do
 */
type CacheService = {
    index: AppCacheIndex
    register: (collection: string, store: UseStore<Store<unknown>>) => void
}

/**
*  Push Notifications
*/
const useCache = create<CacheService>((set, cache) => ({
    index: {},
    register: (collection, store) => {
        const index = { ...cache().index, [collection]: store };
        set({ index })
    }
}));
export default useCache;