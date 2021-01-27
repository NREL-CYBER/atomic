import { AppRoute, AppPath } from "..";
import { AppCacheIndex } from "../state/AppCacheIndex";
import { CompletionStatus } from "../hooks/useCompletion";

export interface AppConfig {
    topBar?: React.FC
    sections?: Record<string, AppRoute[]>
    routes: AppRoute[],
    cache: AppCacheIndex
    bottomBar?: React.FC,
    darkMode?: boolean
}
