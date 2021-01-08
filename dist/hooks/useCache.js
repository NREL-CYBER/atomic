import create from "zustand";

/**
*  Push Notifications
*/
const useCache = create((set, cache) => ({
  index: {},
  register: (collection, store) => {
    const index = { ...cache().index,
      [collection]: store
    };
    set({
      index
    });
  }
}));
export default useCache;