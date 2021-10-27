import { AppColor } from "../theme/AppColor";
export declare type CompletionStatus = "valid" | "unlocked" | "hidden" | "locked";
declare type CompletionService = {
    paths: Record<string, CompletionStatus>;
    setPathState: (pathName: string, status: CompletionStatus) => void;
    isValid: (pathname: string) => boolean;
    isUnlocked: (pathname: string) => boolean;
    pathStatusColor: (pathname: string) => AppColor;
    latestUnockedPath: () => string;
    completion: () => number;
};
declare const useCompletion: import("zustand").UseBoundStore<CompletionService, import("zustand").StoreApi<CompletionService>>;
export default useCompletion;
