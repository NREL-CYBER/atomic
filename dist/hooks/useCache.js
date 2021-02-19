import create from "zustand";

/**
*  Application Cache
*/
const useCache = create((set, cache) => ({
  synchronized: false,
  ready: () => {
    set({
      synchronized: true
    });
  }
}));
export default useCache;