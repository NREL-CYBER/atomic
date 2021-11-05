import React from "react";
import { Store } from "store";
import { StoreListener } from "store/dist/store";
import { AppRoute } from "../core/routing";
import { CompletionStatus } from "../hooks/useCompletion";
import { AppCacheIndex } from "../state/AppCacheIndex";
export interface AppRestConfig {
    endpoint: string;
}
export declare type serializationMode = "rest" | "local" | "custom";
export declare type encryptionMode = "plaintext" | "AES256" | "RSA";
export declare type authProvider = {
    type: "email" | "oauth" | "web3";
    onLogin?: (info: Record<string, string>) => void;
    name?: string;
    oAuthEndPoint?: string;
};
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
    synchronization?: {
        connect: () => Promise<string>;
        listener: (namespace: string, collection: string) => StoreListener<any>;
        preload: (namespace: string, store: () => Store<any>) => Promise<string>;
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
    showNext?: boolean;
    settings?: React.FC;
}
export interface AppTopBarConfig {
    start?: React.FC;
    end?: React.FC;
    showNext?: boolean;
    homeIcon?: string;
}
export interface AppConfig {
    search?: React.FC<{
        query: string;
        filters?: string[];
        dismiss: () => void;
    }>;
    about?: {
        component: React.ReactFragment;
    };
    animated?: boolean;
    appId: string;
    bottomBar?: AppBottomBarConfig;
    cache?: AppCacheIndex;
    completion?: AppCompletionConfig;
    darkMode?: boolean;
    mainMenu?: {
        sections?: Record<string, AppRoute[]>;
        side?: "left" | "right";
        fixed?: boolean;
        type?: "overlay" | "push";
    };
    title: string;
    topBar?: AppTopBarConfig;
    routes: AppRoute[];
    settings?: {
        disabled?: boolean;
        show?: {
            server?: boolean;
            darkmode?: boolean;
        };
        component?: React.FC;
    };
    serialization: AppSerializationConfig;
    version: string;
}
