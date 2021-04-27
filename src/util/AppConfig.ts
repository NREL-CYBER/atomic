import { AppRoute } from "../core/routing";
import { CompletionStatus } from "../hooks/useCompletion";
import { AppCacheIndex } from "../state/AppCacheIndex";

export interface AppRestConfig {
    endpoint: string,
}
export interface AppSerializationConfig {
    mode: "rest" | "local"
    overide?: {
        collections: string[]
        mode: "rest" | "local"
    },
    encryption?: "plaintext" | "RSA"
    authentication?: {
        provider: "email"
    },
    rest?: AppRestConfig
}

export interface AppCompletionConfig {
    disabled?: boolean
    default: CompletionStatus
}
export interface AppBottomBarConfig {
    start?: React.FC
    end?: React.FC
}

export interface AppConfig {
    title: string
    completion?: AppCompletionConfig,
    version: string
    topBar?: React.FC
    sections?: Record<string, AppRoute[]>
    routes: AppRoute[],
    cache: AppCacheIndex
    bottomBar?: AppBottomBarConfig,
    about?: React.ReactFragment,
    serialization: AppSerializationConfig
    darkMode?: boolean
}

