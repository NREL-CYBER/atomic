import create from "zustand";
/**
 */

/**
*  Application Cache status
*/
const useCache = create((set, cache) => ({
  status: "booting",
  synchronizing: () => {
    set({
      status: "synchronizing"
    });
  },
  ready: () => {
    set({
      status: "idle"
    });
  }
}));
export default useCache;