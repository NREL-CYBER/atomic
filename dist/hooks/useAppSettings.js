import create from "zustand";
import { set as idbSet, get } from "idb-keyval";

/**
*  Application Cache status
*/
export const useAppSettings = create((set, settings) => ({
  serverStatus: "unknown",
  darkMode: true,
  initialized: false,
  authorized: false,
  initialize: async appConfig => {
    const savedSettings = await get("atomic-settings");
    const cacheFields = { ...JSON.parse(savedSettings)
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
    settings().serialize();
  },
  serialize: () => {
    const {
      server,
      darkMode,
      encryption
    } = settings();
    idbSet("atomic-settings", JSON.stringify({
      server,
      darkMode,
      encryption
    }));
  },
  setAuthorized: authorized => {
    set({
      authorized
    });
    settings().serialize();
  },
  setServer: server => {
    set({
      server
    });
    settings().serialize();
  },
  setServerStatus: serverStatus => {
    set({
      serverStatus
    });
  },
  setDarkMode: darkMode => {
    set({
      darkMode
    });
    settings().serialize();
  }
}));