import { AppColor } from "../theme/AppColor";
import create from "zustand";



type AppCompletion = {
    totalPaths: number,
    unlockedPaths: string[],
    validPaths: string[],
    isValid: (pathname: string) => boolean,
    isUnlocked: (pathname: string) => boolean,
    markUnlocked: (pathname: string) => void
    markValid: (pathname: string) => void
    markLocked: (pathname: string) => void
    markInValid: (pathname: string) => void
    pathStatusColor: (pathname: string) => AppColor
    latestUnockedPath: () => string
    completion: () => number
}
const useCompletion = create<AppCompletion>((set, store) => ({
    /* all Routes in the app */
    totalPaths: -1,
    unlockedPaths: [],
    validPaths: [],
    markUnlocked: (path) => {
        set({ unlockedPaths: [...store().unlockedPaths, path] })
    },
    markValid: (path) => {
        set({ validPaths: [...store().validPaths, path] })
    },
    markLocked: (path) => {
        set({ unlockedPaths: [...store().unlockedPaths.filter(x => x !== path)] })
    },
    markInValid: (path) => {
        set({ validPaths: [...store().unlockedPaths.filter(x => x !== path)] })
    },
    isUnlocked: (path) => {
        return store().unlockedPaths.includes(path) || store().validPaths.includes(path);
    },
    isValid: (path) => {
        return store().validPaths.includes(path);
    },
    pathStatusColor: (path) => {
        return store().isValid(path) ? "favorite" : store().isUnlocked(path) ? "primary" : "medium";
    },
    latestUnockedPath: () => {
        const invalidUnlockedPaths = store().unlockedPaths.filter(path => !store().validPaths.includes(path));
        return invalidUnlockedPaths[invalidUnlockedPaths.length - 1] || "/"
    },
    completion: () => {
        return (store().validPaths.length + 1) / store().totalPaths
    }

}));
export default useCompletion;