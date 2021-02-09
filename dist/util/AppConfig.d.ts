/// <reference types="react" />
import { AppCacheIndex } from "../state/AppCacheIndex";
import { AppRoute } from "../core/routing";
export interface AppCloudConfig {
    provider: {
        firebase: {
            apiKey?: string;
            authDomain?: string;
            databaseURL?: string;
            projectId?: string;
            storageBucket?: string;
            messagingSenderId?: string;
            appId?: string;
            measurementId?: string;
        };
        authentication: {
            required: boolean;
            provider: "phone" | "email";
        };
    };
}
export interface AppConfig {
    title: string;
    version: string;
    topBar?: React.FC;
    sections?: Record<string, AppRoute[]>;
    routes: AppRoute[];
    cache: AppCacheIndex;
    bottomBar?: React.FC;
    serialization?: {
        mode: "cloud" | "local";
        encryption: "plaintext" | "RSA";
        cloud?: AppCloudConfig;
    };
    darkMode?: boolean;
}
