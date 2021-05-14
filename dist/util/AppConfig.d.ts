/// <reference types="react" />
import { AppRoute } from "../core/routing";
import { CompletionStatus } from "../hooks/useCompletion";
import { AppCacheIndex } from "../state/AppCacheIndex";
export interface AppRestConfig {
    endpoint: string;
}
export declare type serializationMode = "rest" | "local";
export declare type encryptionMode = "plaintext" | "AES256";
export declare type authProvider = "email";
export interface AppSerializationConfig {
    mode: serializationMode;
    overide?: {
        collections: string[];
        mode: serializationMode;
    };
    encryption?: encryptionMode;
    authentication?: {
        provider: authProvider;
    };
    rest?: AppRestConfig;
}
export interface AppCompletionConfig {
    disabled?: boolean;
    default: CompletionStatus;
}
export interface AppBottomBarConfig {
    start?: React.FC;
    end?: React.FC;
}
export interface AppConfig {
    title: string;
    completion?: AppCompletionConfig;
    version: string;
    topBar?: React.FC;
    sections?: Record<string, AppRoute[]>;
    routes: AppRoute[];
    cache: AppCacheIndex;
    bottomBar?: AppBottomBarConfig;
    about?: React.ReactFragment;
    serialization: AppSerializationConfig;
    darkMode?: boolean;
}
