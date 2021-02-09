import { AppCacheIndex } from "../state/AppCacheIndex";
/**
 */
declare type CacheService = {
    index?: AppCacheIndex;
    register: (index: AppCacheIndex) => void;
};
/**
*  Application Cache
*/
declare const useCache: import("zustand").UseStore<CacheService>;
export default useCache;
