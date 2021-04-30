import create from "zustand";



/**
 */
type CacheStatus = {
    status: "booting" | "synchronizing" |
    "idle",
    ready: () => void
    synchronizing: () => void
}

/**
*  Application Cache status
*/
const useCache = create<CacheStatus>((set, cache) => ({
    status: "booting",
    synchronizing: () => {
        set({ status: "synchronizing" })
    },
    ready: () => {
        set({ status: "idle" })
    }
}));
export default useCache;