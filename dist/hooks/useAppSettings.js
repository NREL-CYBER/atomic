import create from "zustand";
import { set as idbSet, get } from "idb-keyval";

/**
*  Application Cache status
*/
export const useAppSettings = create((set, cache) => ({
  darkMode: true,
  initialized: false,
  initialize: async appConfig => {
    const savedCache = await get("atomic-settings");
    const cacheFields = { ...JSON.parse(savedCache)
    }; // Combine serialized settings and app-config

    const {
      encryption,
      darkMode,
      server
    } = { ...appConfig,
      ...cacheFields
    };
    set({
      encryption,
      darkMode,
      server,
      initialized: true
    });
    cache().serialize();
  },
  serialize: () => {
    const {
      server,
      darkMode,
      encryption
    } = cache();
    idbSet("atomic-settings", JSON.stringify({
      server,
      darkMode,
      encryption
    }));
  },
  setServer: server => {
    set({
      server
    });
    cache().serialize();
  },
  setDarkMode: darkMode => {
    set({
      darkMode
    });
    cache().serialize();
  }
}));