import { UseStore } from "zustand";
import { AppCacheIndex } from "../state/AppCache";
import { Store } from "store";
/**
 * Type that defines what the useNotifications hook can do
 */
declare type CacheService = {
    index: AppCacheIndex;
    register: (collection: string, store: UseStore<Store<unknown>>) => void;
};
/**
*  Push Notifications
*/
declare const useCache: UseStore<CacheService>;
export default useCache;
