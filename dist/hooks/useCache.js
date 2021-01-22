import create from "zustand";

/**
*  Application Cache
*/
const useCache = create((set, cache) => ({
  register: index => {
    set({
      index
    });
  }
}));
export default useCache;