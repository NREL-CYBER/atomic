/**
 */
declare type CacheService = {
    synchronized: boolean;
    ready: () => void;
};
/**
*  Application Cache
*/
declare const useCache: import("zustand").UseStore<CacheService>;
export default useCache;
