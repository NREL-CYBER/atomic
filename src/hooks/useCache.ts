import create from "zustand";
import { AppCacheIndex } from "../state/AppCacheIndex";



/**
 * Type that defines what the useNotifications hook can do
 */
type CacheService = {
    index: AppCacheIndex
    register: (index: AppCacheIndex) => void
}

/**
*  Application Cache
*/
const useCache = create<CacheService>((set, cache) => ({
    index: {},
    register: (index) => {
        set({ index })
    }
}));
export default useCache;