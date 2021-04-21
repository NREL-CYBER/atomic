import { AppCacheIndex } from "../state/AppCacheIndex";
import { AppRoute } from "../core/routing";
import { CompletionStatus } from "../hooks/useCompletion";
import { RootSchemaObject } from "validator";

export interface AppRestConfig {
    endpoint: string,
}
export interface AppSerializationConfig {
    mode: "rest" | "local"
    overide?: {
        collections: string[]
        mode: "rest" | "local"
    },
    encryption: "plaintext" | "RSA"
    authentication?: {
        provider: "email"
        profile?: RootSchemaObject
    },
    rest?: AppRestConfig
}

export interface AppCompletionConfig {
    disabled?: boolean
    default: CompletionStatus
}

export interface AppConfig {
    title: string
    completion?: AppCompletionConfig,
    version: string
    topBar?: React.FC
    sections?: Record<string, AppRoute[]>
    routes: AppRoute[],
    cache: AppCacheIndex
    bottomBar?: {
        start?: React.FC
        end?: React.FC
    },
    about?: React.ReactFragment,
    serialization?: AppSerializationConfig
    darkMode?: boolean
}
