import { UseStore } from "zustand";
import { RootSchemaObject } from "validator";
import { Store } from "store";
export interface AppCacheConfig {
    schemas: RootSchemaObject[];
}
declare type CollectionStore = UseStore<Store<unknown>>;
export declare type AppCacheIndex = Record<string, CollectionStore>;
export {};
