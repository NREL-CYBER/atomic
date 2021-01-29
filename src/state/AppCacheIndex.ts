import { StoreApi } from "zustand";
import { Store } from "store/dist/store";


type namespace = string;
type definition = string;

export type AppCacheIndex = Record<namespace, Record<definition, StoreApi<Store<any>>>>
