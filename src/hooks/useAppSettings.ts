import create from "zustand";
import { set as idbSet, get } from "idb-keyval"
import { AppConfig } from "../util";
export interface AppSettingsProperties {
    encryption?: string,
    darkMode: boolean,
    server?: string,
    initialized: boolean,
}
export interface AppSettingCache extends AppSettingsProperties {
    setServer: (server: string) => void
    initialize: (config: AppConfig) => void
    setDarkMode: (isDark: boolean) => void
    serialize: () => void
}
/**
*  Application Cache status
*/
export const useAppSettings = create<AppSettingCache>((set, cache) => ({
    darkMode: true,
    initialized: false,
    initialize: async (appConfig) => {
        const savedCache = await get("atomic-settings")
        const cacheFields = {
            ...JSON.parse(savedCache)
        } as AppSettingsProperties
        // Combine serialized settings and app-config
        const { encryption, darkMode, server } = { ...appConfig, ...cacheFields };
        set({ encryption, darkMode, server, initialized: true })
        cache().serialize();
    },
    serialize: () => {
        const { server, darkMode, encryption } = cache()
        idbSet("atomic-settings", JSON.stringify(({ server, darkMode, encryption })))
    },
    setServer: (server) => {
        set({ server })
        cache().serialize();
    },
    setDarkMode: (darkMode) => {
        set({ darkMode })
        cache().serialize();
    }
}));


