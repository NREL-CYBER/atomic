
import { UseStore } from "zustand"
import { RootSchemaObject } from "validator";
import { Store } from "store";

export interface AppCacheConfig {
    schemas: RootSchemaObject[]
};
type CollectionStore = UseStore<Store<unknown>>;

export type AppCacheIndex = Record<string, CollectionStore>; 