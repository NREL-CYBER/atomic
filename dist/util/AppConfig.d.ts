/// <reference types="react" />
import { AppCacheIndex } from "../state/AppCacheIndex";
import { AppRoute } from "../core/routing";
import { CompletionStatus } from "../hooks/useCompletion";
export interface AppRestConfig {
    provider: {
        endpoint: string;
        authentication?: {
            provider: "email";
        };
    };
}
export interface AppSerializationConfig {
    mode: "rest" | "local";
    encryption: "plaintext" | "RSA";
    rest?: AppRestConfig;
}
export interface AppConfig {
    title: string;
    completion?: {
        disabled?: boolean;
        default: CompletionStatus;
    };
    version: string;
    topBar?: React.FC;
    sections?: Record<string, AppRoute[]>;
    routes: AppRoute[];
    cache: AppCacheIndex;
    bottomBar?: {
        start?: React.FC;
        end?: React.FC;
    };
    about?: React.ReactFragment;
    serialization?: AppSerializationConfig;
    darkMode?: boolean;
}
