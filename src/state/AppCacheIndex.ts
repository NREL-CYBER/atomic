
import { Store } from "store";
import { RootSchemaObject } from "validator";
import { UseStore } from "zustand";

export interface AppCacheConfig<AppCacheCollections> {
    schemas: RootSchemaObject[]
    cacheIndex: AppCacheCollections
};
type CollectionStore<T> = UseStore<Store<T>>;

export type AppCacheIndex = Record<string, unknown>;