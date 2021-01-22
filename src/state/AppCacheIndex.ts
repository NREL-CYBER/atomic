import { StoreApi } from "zustand";
import { Store } from "store/dist/store";


type namespace = string;
type definition = string;

export interface AppCacheIndex {
    index: Record<namespace, Record<definition, StoreApi<Store<any>>>>
};
