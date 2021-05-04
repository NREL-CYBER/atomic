import { composeStore } from "store";
import create from "zustand";
const schema = {
  "$id": "credential",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "User ID and Password hash",
  "title": "Account",
  "type": "object",
  "properties": {
    "uid": {
      "type": "string"
    },
    "password_hash": {
      "type": "string",
      "writeOnly": true
    }
  },
  "required": ["uid", "password_hash"]
};
export const account = {
  credential: composeStore({
    schema
  })
};
/**
 *  Hook for Storing authorization mode, user identifier sha3 hash of email & darkmode
 *  storing all the routes
 *  and knowing the nested page and determining the next page.
 */

const useAppAccount = create((set, store) => ({
  initialize: config => {
    set({
      authProvider: config.serialization && config.serialization.authentication && config.serialization.authentication.provider
    });

    if (config.serialization && config.serialization.mode === "local") {}
  },
  setUid: uid => set({
    uid
  }),
  authenticated: () => typeof store().authProvider !== "undefined" && typeof store().uid !== "undefined"
}));
export default useAppAccount;