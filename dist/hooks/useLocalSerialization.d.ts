import { Store } from 'store';
export declare type localSynchronizationContext = {
    authenticate(email: string, password: string, action: "login" | "create", onLoginSuccess: (uid: string) => void): void;
    synchronize<T>(namespace: string, store: () => Store<T>, uid: string): void;
};
/**
 * Observe an Entity collection in cloud storage
 */
declare const useIndexDBStorage: import("zustand").UseStore<localSynchronizationContext>;
export default useIndexDBStorage;
