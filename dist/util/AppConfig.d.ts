import React from "react";
import { AppRoute } from "../core/routing";
import { CompletionStatus } from "../hooks/useCompletion";
import { AppCacheIndex } from "../state/AppCacheIndex";
export interface AppRestConfig {
    endpoint: string;
}
export declare type serializationMode = "rest" | "local";
export declare type encryptionMode = "plaintext" | "AES256" | "RSA";
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
    hideNext?: boolean;
    settings?: React.FC;
}
export interface AppConfig {
    about?: React.ReactFragment;
    animated?: boolean;
    appId: string;
    bottomBar?: AppBottomBarConfig;
    cache?: AppCacheIndex;
    completion?: AppCompletionConfig;
    darkMode?: boolean;
    sections?: Record<string, AppRoute[]>;
    title: string;
    topBar?: React.FC;
    routes: AppRoute[];
    settings?: {
        disabled?: boolean;
        show?: {
            server?: boolean;
            darkmode?: boolean;
        };
        component?: React.FC;
    };
    serialization?: AppSerializationConfig;
    version: string;
}
