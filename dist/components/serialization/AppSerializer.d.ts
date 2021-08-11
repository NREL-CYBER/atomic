import React from "react";
import { Store } from "store";
import { UseStore } from "zustand";
import { SynchronizationContext } from "../../hooks/useLocalSerialization";
import { AppCacheIndex } from "../../state/AppCacheIndex";
import { AppSerializationConfig } from "../../util/AppConfig";
export interface appLocalSerializerProps {
    cache: AppCacheIndex;
    serialization: AppSerializationConfig;
    context: UseStore<SynchronizationContext>;
    uid?: string;
    endpoint?: string;
}
export declare const InitializeSynchronization: (cache: AppCacheIndex, serialization: AppSerializationConfig, uid: string, synchronize: <T>(serialization: AppSerializationConfig, namespace: string, store: () => Store<T>, uid: string, onComplete?: (() => void) | undefined) => void, onComplete: () => void) => Promise<void>;
declare const _default: React.NamedExoticComponent<appLocalSerializerProps>;
export default _default;
