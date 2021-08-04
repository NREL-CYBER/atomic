import React from "react";
import { AppRoute } from "../core/routing";
import { CompletionStatus } from "../hooks/useCompletion";
import { AppCacheIndex } from "../state/AppCacheIndex";

export interface AppRestConfig {
    endpoint: string,
}
export type serializationMode = "rest" | "local";
export type encryptionMode = "plaintext" | "AES256" | "RSA";
export type authProvider = "email";

export interface AppSerializationConfig {
    mode: serializationMode
    overide?: {
        collections: string[]
        mode: serializationMode
    },
    encryption?: encryptionMode
    authentication?: {
        provider: authProvider
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
    hideNext?: boolean
    settings?: React.FC
}

export interface AppConfig {
    title: string
    appId: string,
    completion?: AppCompletionConfig,
    version: string
    topBar?: React.FC
    sections?: Record<string, AppRoute[]>
    routes: AppRoute[],
    cache?: AppCacheIndex
    bottomBar?: AppBottomBarConfig,
    about?: React.ReactFragment,
    settings?: {
        disabled?: boolean,
        show?: {
            server?: boolean,
            darkmode?: boolean
        },
        component?: React.FC
    },
    serialization?: AppSerializationConfig
    darkMode?: boolean
}

