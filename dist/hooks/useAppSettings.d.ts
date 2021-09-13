import { AppConfig } from "../util";
import { AppRoute } from "../core/routing";
export declare type ServerStatus = "unknown" | "connected" | "needs-permission" | "connecting" | "error";
export interface AppSettingsProperties {
    encryption?: string;
    darkMode: boolean;
    endpoint?: string;
    initialized: boolean;
    authorized: boolean;
    serverStatus: ServerStatus;
}
export interface AppSettingCache extends AppSettingsProperties {
    setServerStatus: (serverStatus: ServerStatus) => void;
    setEndpoint: (endpoint: string) => void;
    initialize: (config: AppConfig) => void;
    setDarkMode: (isDark: boolean) => void;
    setAuthorized: (authorized: boolean) => void;
    serialize: () => void;
    sections: Record<string, AppRoute[]>;
}
/**
*  Application Cache status
*/
export declare const useAppSettings: import("zustand").UseStore<AppSettingCache>;
