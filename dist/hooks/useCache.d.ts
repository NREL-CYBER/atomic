/**
 */
declare type CacheStatus = {
    status: "booting" | "synchronizing" | "idle";
    ready: () => void;
    synchronizing: () => void;
};
/**
*  Application Cache status
*/
declare const useCache: import("zustand").UseStore<CacheStatus>;
export default useCache;
