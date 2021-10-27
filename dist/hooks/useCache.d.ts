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
declare const useCache: import("zustand").UseBoundStore<CacheStatus, import("zustand").StoreApi<CacheStatus>>;
export default useCache;
