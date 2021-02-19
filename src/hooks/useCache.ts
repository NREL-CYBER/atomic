import create from "zustand";
import { AppCacheIndex } from "../state/AppCacheIndex";



/**
 */
type CacheService = {
    synchronized: boolean
    ready: () => void
}

/**
*  Application Cache
*/
const useCache = create<CacheService>((set, cache) => ({
    synchronized: false,
    ready: () => {
        set({ synchronized: true })
    }
}));
export default useCache;