import create from "zustand";
import { AppCacheIndex } from "../state/AppCacheIndex";
import { AppColor } from "../theme/AppColor";



export interface CompletionConfiguration {
    conditions: Record<string, CompletionCondition>
}

export type CompletionStatus = "valid" | "unlocked" | "hidden" | "locked"
export type CompletionCondition = <CacheLayout>(cache: AppCacheIndex) => CompletionStatus

type CompletionService = {
    order: string[],
    paths: Record<string, CompletionStatus>,
    setPathState: (pathName: string, status: CompletionStatus) => void
    isValid: (pathname: string) => boolean,
    isUnlocked: (pathname: string) => boolean,
    pathStatusColor: (pathname: string) => AppColor
    latestUnockedPath: () => string
    completion: () => number,
    setOrder: (order: string[]) => void
}

const useCompletion = create<CompletionService>((set, store) => ({
    /* all Routes in the app */
    order: [],
    paths: {},
    setPathState: (path, status) => {
        set({ paths: { ...store().paths, [path]: status } });
    },
    isUnlocked: (path) => {
        return store().paths[path] === "unlocked" || store().paths[path] === "valid";
    },
    isValid: (path) => {
        return store().paths[path] === "valid";
    },
    pathStatusColor: (path) => {
        return store().isValid(path) ? "favorite" : store().isUnlocked(path) ? "primary" : "medium";
    },
    latestUnockedPath: () => {
        store().order.forEach((path) => {
            if (store().paths[path] === "unlocked") {
                return path;
            }
        })
        return store().order[0];
    },
    completion: () => {
        const allPathStates = Object.values(store().paths);
        const validPaths = allPathStates.filter(x => x === "valid");
        return validPaths.length / allPathStates.length;
    }, setOrder: (order) => {
        set({ order })
    }
}));
export default useCompletion;