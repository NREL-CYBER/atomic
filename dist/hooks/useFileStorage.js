import { composeStore } from "store";
import create from "zustand";
import { get, set } from 'idb-keyval';
export const fileSchema = {
  "$id": "https://nrel.gov/file.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "File Resource",
  "type": "object",
  "properties": {
    file: {
      type: "string"
    },
    URI: {
      type: "string"
    },
    type: {
      type: "string"
    },
    // MIME type, example: `image/*`
    name: {
      type: "string"
    },
    size: {
      type: "string"
    },
    // bytes
    lastModifiedDate: {
      type: "string"
    } // ISO string

  }
};
export const usefileStore = composeStore({
  schema: fileSchema
});
/**
 * Observe an Entity collection in cloud storage
 */

const useFileStorage = create(override => ({
  provider: "local",
  fetch: async URI => {
    const meta = await get(URI + "#meta");
    return { ...meta,
      arrayBuffer: () => {
        get(URI);
      }
    };
  },
  configure: (api, provider) => {
    override({ ...api,
      provider
    });
  },
  insert: async (file, URI) => {
    const binary = await file.arrayBuffer();
    const {
      name,
      lastModified,
      size,
      type
    } = file;
    set(URI, binary);
    set(URI + "#meta", {
      name,
      lastModified,
      size,
      type
    });
    return "";
  },
  delete: URI => {
    set(URI, undefined);
    set(URI + "#meta", undefined);
  }
}));
export default useFileStorage;