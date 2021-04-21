import { Store } from "store";
import { AppSerializationConfig } from "../util/AppConfig";
export declare type restSynchronizationContext = {
    synchronize<T>(serialization: AppSerializationConfig, namespace: string, store: () => Store<T>, uid: string, onComplete?: () => void): void;
};
/**
 * Observe an Entity collection in rest storage
 */
export declare const useRestSerializeation: import("zustand").UseStore<restSynchronizationContext>;
