import { StoreApi } from "zustand";
import { Store } from "store/dist/store";
declare type namespace = string;
declare type definition = string;
export interface AppCacheIndex {
    index: Record<namespace, Record<definition, StoreApi<Store<any>>>>;
}
export {};
