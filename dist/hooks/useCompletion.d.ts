import { AppCacheIndex } from "../state/AppCacheIndex";
import { AppColor } from "../theme/AppColor";
export interface CompletionConfiguration {
    conditions: Record<string, CompletionCondition>;
}
export declare type CompletionStatus = "valid" | "unlocked" | "hidden" | "locked";
export declare type CompletionCondition = (cache: AppCacheIndex) => CompletionStatus;
declare type CompletionService = {
    order: string[];
    paths: Record<string, CompletionStatus>;
    setPathState: (pathName: string, status: CompletionStatus) => void;
    isValid: (pathname: string) => boolean;
    isUnlocked: (pathname: string) => boolean;
    pathStatusColor: (pathname: string) => AppColor;
    latestUnockedPath: () => string;
    completion: () => number;
};
declare const useCompletion: import("zustand").UseStore<CompletionService>;
export default useCompletion;
