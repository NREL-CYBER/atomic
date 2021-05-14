import React from "react";
import { UseStore } from "zustand";
import { SynchronizationContext } from "../../hooks/useLocalSerialization";
import { AppCacheIndex } from "../../state/AppCacheIndex";
import { AppSerializationConfig } from "../../util/AppConfig";
export interface appLocalSerializerProps {
    cache: AppCacheIndex;
    serialization: AppSerializationConfig;
    context: UseStore<SynchronizationContext>;
    uid?: string;
}
declare const _default: React.NamedExoticComponent<appLocalSerializerProps>;
export default _default;
