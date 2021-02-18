import { AppCacheIndex } from "../state/AppCacheIndex";
import { AppRoute } from "../core/routing";
import { CompletionStatus } from "../hooks/useCompletion";

export interface AppCloudConfig {
    provider: {
        firebase: {
            apiKey?: string,
            authDomain?: string,
            databaseURL?: string,
            projectId?: string,
            storageBucket?: string,
            messagingSenderId?: string,
            appId?: string,
            measurementId?: string

        }
        authentication: {
            required: boolean,
            provider: "email",
        }
    }
}
export interface AppSerializationConfig {
    mode: "cloud" | "local"
    encryption: "plaintext" | "RSA"
    cloud?: AppCloudConfig
}



export interface AppConfig {
    title: string
    completion?: {
        default: CompletionStatus
    }
    version: string
    topBar?: React.FC
    sections?: Record<string, AppRoute[]>
    routes: AppRoute[],
    cache: AppCacheIndex
    bottomBar?: React.FC,
    serialization?: AppSerializationConfig
    darkMode?: boolean
}
