import { Store } from "store";
import { UseBoundStore } from "zustand";
import { AppConfig } from "../util";
import { authProvider } from "../util/AppConfig";
/**
 * Type that defines what the useApplayout hook will be capable of
 */
declare type AppAccountState = {
    uid?: string;
    authProvider?: authProvider;
    setUid: (uid?: string) => void;
    initialize: (config: AppConfig) => void;
    authenticated: () => boolean;
};
interface UserCredential {
    uid: string;
    password_hash: string;
}
export declare type AccountCache = {
    /**
     * Credential Store hook
     */
    credential: UseBoundStore<Store<UserCredential>>;
};
export declare const account: AccountCache;
/**
 *  Hook for Storing authorization mode, user identifier sha3 hash of email & darkmode
 *  storing all the routes
 *  and knowing the nested page and determining the next page.
 */
declare const useAppAccount: UseBoundStore<AppAccountState, import("zustand").StoreApi<AppAccountState>>;
export default useAppAccount;
