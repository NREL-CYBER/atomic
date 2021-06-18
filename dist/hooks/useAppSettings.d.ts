import { AppConfig } from "../util";
export interface AppSettingsProperties {
    encryption?: string;
    darkMode: boolean;
    server?: string;
    initialized: boolean;
}
export interface AppSettingCache extends AppSettingsProperties {
    setServer: (server: string) => void;
    initialize: (config: AppConfig) => void;
    setDarkMode: (isDark: boolean) => void;
    serialize: () => void;
}
/**
*  Application Cache status
*/
export declare const useAppSettings: import("zustand").UseStore<AppSettingCache>;
