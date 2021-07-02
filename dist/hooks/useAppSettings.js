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
    const savedSettings = (await get("atomic-settings")) || {};
    const cacheFields = { ...JSON.parse(savedSettings)
    }; // Combine serialized settings and app-config

    const defaultEndpoint = appConfig.serialization && appConfig.serialization.rest && appConfig.serialization.rest.endpoint;
    const {
      encryption,
      darkMode,
      endpoint,
      authorized
    } = { ...appConfig,
      endpoint: defaultEndpoint,
      ...cacheFields
    };
    set({
      encryption,
      darkMode,
      authorized,
      endpoint,
      initialized: true
    });
    settings().serialize();
  },
  serialize: () => {
    const {
      endpoint,
      darkMode,
      encryption,
      authorized
    } = settings();
    idbSet("atomic-settings", JSON.stringify({
      endpoint,
      darkMode,
      encryption,
      authorized
    }));
  },
  setAuthorized: authorized => {
    set({
      authorized
    });
    settings().serialize();
  },
  setEndpoint: endpoint => {
    set({
      endpoint
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