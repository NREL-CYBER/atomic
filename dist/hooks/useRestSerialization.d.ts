import { Store } from "store";
import { AppSerializationConfig } from "../util/AppConfig";
export declare type restSynchronizationContext = {
    authenticate(email: string, password: string, action: "login" | "create", onLoginSuccess: (uid: string) => void, onLoginFail: () => void): void;
    synchronize<T>(namespace: string, store: () => Store<T>, uid: string): void;
};
/**
 * Observe an Entity collection in rest storage
 */
export declare const useRestSerializeation: (serializaion: AppSerializationConfig) => restSynchronizationContext;
