import create from "zustand";
import { AppCacheIndex } from "../state/AppCacheIndex";



/**
 */
type CacheService = {
    index?: AppCacheIndex
    register: (index: AppCacheIndex) => void
}

/**
*  Application Cache
*/
const useCache = create<CacheService>((set, cache) => ({
    register: (index) => {
        set({ index })
    }
}));
export default useCache;