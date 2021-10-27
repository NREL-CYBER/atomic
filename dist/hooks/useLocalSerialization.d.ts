import { Store } from 'store';
import { AppSerializationConfig } from '../util/AppConfig';
export declare type SynchronizationContext = {
    provider: string;
    synchronize<T>(serialization: AppSerializationConfig, namespace: string, store: () => Store<T>, uid: string, onComplete?: () => void): void;
};
/**
 * Serialize cache to indexDB any time it changes via store listener
 * */
declare const useIndexDBStorage: import("zustand").UseBoundStore<SynchronizationContext, import("zustand").StoreApi<SynchronizationContext>>;
export default useIndexDBStorage;
