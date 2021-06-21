import { AppConfig } from "../util";
export declare type ServerStatus = "unknown" | "connected" | "needs-permission" | "connecting" | "error";
export interface AppSettingsProperties {
    encryption?: string;
    darkMode: boolean;
    server?: string;
    initialized: boolean;
    authorized: boolean;
    serverStatus: ServerStatus;
}
export interface AppSettingCache extends AppSettingsProperties {
    setServerStatus: (serverStatus: ServerStatus) => void;
    setServer: (server: string) => void;
    initialize: (config: AppConfig) => void;
    setDarkMode: (isDark: boolean) => void;
    setAuthorized: (authorized: boolean) => void;
    serialize: () => void;
}
/**
*  Application Cache status
*/
export declare const useAppSettings: import("zustand").UseStore<AppSettingCache>;
