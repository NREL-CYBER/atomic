import { Store } from 'store';
export declare type localSynchronizationContext = {
    synchronize<T>(namespace: string, store: () => Store<T>): void;
};
declare const useLocalSerialization: import("zustand").UseStore<localSynchronizationContext>;
export default useLocalSerialization;
