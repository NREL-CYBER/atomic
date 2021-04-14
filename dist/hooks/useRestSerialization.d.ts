import { AppRestConfig } from "../util/AppConfig";
import { Store } from "store";
export declare type restSynchronizationContext = {
    endpoint: string;
    authenticate(email: string, password: string, action: "login" | "create", onLoginSuccess: (uid: string) => void, onLoginFail: () => void): void;
    synchronize<T>(namespace: string, store: () => Store<T>, uid: string): void;
};
/**
 * Observe an Entity collection in cloud storage
 */
declare function useRestSerialization(restConfig: AppRestConfig): import("zustand").UseStore<restSynchronizationContext>;
export default useRestSerialization;
