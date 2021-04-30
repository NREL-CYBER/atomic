import { composeStore, Store } from "store";
import create, { UseStore } from "zustand";
import { AppConfig } from "../util";


/**
 * Type that defines what the useApplayout hook will be capable of
 */
type AppAccountState = {
    uid?: string,
    authProvider?: string,
    setUid: (uid?: string) => void
    initialize: (config: AppConfig) => void
    authenticated: () => boolean
}
interface UserCredential {
    uid: string,
    password_hash: string
}
const schema = {
    "$id": "credential",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "description": "User ID and Password hash",
    "title": "Account",
    "type": "object",
    "properties": {
        "uid": {
            "type": "string",
        },
        "password_hash": {
            "type": "string",
            "writeOnly": true
        }
    },
    "required": [
        "uid",
        "password_hash"
    ]
}

export type AccountCache = {
    /**
     * Credential Store hook
     */
    credential: UseStore<Store<UserCredential>>
}
export const account: AccountCache = {
    credential: composeStore({
        schema,
    })
}

/**
 *  Hook for Storing authorization mode, user identifier sha3 hash of email & darkmode
 *  storing all the routes
 *  and knowing the nested page and determining the next page.
 */
const useAppAccount = create<AppAccountState>((set, store) => ({
    initialize: (config) => {
        set({
            authProvider: config.serialization?.authentication?.provider
        })
        if (config.serialization?.mode === "local") {

        }
    },
    setUid: (uid) =>
        set({ uid })
    , authenticated: () =>
        typeof store().authProvider !== "undefined" &&
        typeof store().uid !== "undefined"
}));
export default useAppAccount;
