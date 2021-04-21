import { Store } from 'store';
import { AppSerializationConfig } from '../util/AppConfig';
export declare type localSynchronizationContext = {
    synchronize<T>(serialization: AppSerializationConfig, namespace: string, store: () => Store<T>, uid: string, onComplete?: () => void): void;
};
/**
 * Observe an Entity collection in cloud storage
 */
declare const useIndexDBStorage: import("zustand").UseStore<localSynchronizationContext>;
export default useIndexDBStorage;
