import create from "zustand";
const useCompletion = create((set, store) => ({
  /* all Routes in the app */
  order: [],
  paths: {},
  setPathState: (path, status) => {
    set({
      paths: { ...store().paths,
        [path]: status
      }
    });
  },
  isUnlocked: path => {
    return store().paths[path] === "unlocked";
  },
  isValid: path => {
    return store().paths[path] === "valid";
  },
  pathStatusColor: path => {
    return store().isValid(path) ? "favorite" : store().isUnlocked(path) ? "primary" : "medium";
  },
  latestUnockedPath: () => {
    store().order.forEach(path => {
      if (store().paths[path] === "unlocked") {
        return path;
      }
    });
    return store().order[0];
  },
  completion: () => {
    const allPathStates = Object.values(store().paths);
    const validPaths = allPathStates.filter(x => x === "valid");
    return validPaths.length / allPathStates.length;
  }
}));
export default useCompletion;