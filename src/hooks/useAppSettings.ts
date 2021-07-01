import create from "zustand";
import { set as idbSet, get } from "idb-keyval"
import { AppConfig } from "../util";
export type ServerStatus = "unknown" | "connected" | "needs-permission" | "connecting" | "error";
export interface AppSettingsProperties {
    encryption?: string,
    darkMode: boolean,
    endpoint?: string,
    initialized: boolean,
    authorized: boolean,
    serverStatus: ServerStatus
}
export interface AppSettingCache extends AppSettingsProperties {
    setServerStatus: (serverStatus: ServerStatus) => void
    setEndpoint: (endpoint: string) => void
    initialize: (config: AppConfig) => void
    setDarkMode: (isDark: boolean) => void
    setAuthorized: (authorized: boolean) => void
    serialize: () => void
}
/**
*  Application Cache status
*/
export const useAppSettings = create<AppSettingCache>((set, settings) => ({
    serverStatus: "unknown",
    darkMode: true,
    initialized: false,
    authorized: false,
    initialize: async (appConfig) => {
        const savedSettings = await get("atomic-settings") || {}
        const cacheFields = {
            ...JSON.parse(savedSettings)
        } as AppSettingsProperties
        // Combine serialized settings and app-config
        const { encryption, darkMode, endpoint, authorized } = { ...appConfig, endpoint: appConfig.serialization?.rest?.endpoint, ...cacheFields };
        set({ encryption, darkMode, authorized, endpoint, initialized: true })
        settings().serialize();
    },
    serialize: () => {
        const { endpoint, darkMode, encryption, authorized } = settings()
        idbSet("atomic-settings", JSON.stringify(({ endpoint, darkMode, encryption, authorized })))
    },
    setAuthorized: (authorized) => {
        set({ authorized })
        settings().serialize();
    },
    setEndpoint: (endpoint) => {
        set({ endpoint })
        settings().serialize();
    },
    setServerStatus: (serverStatus) => {
        set({ serverStatus })
    },
    setDarkMode: (darkMode) => {
        set({ darkMode })
        settings().serialize();
    }
}));


