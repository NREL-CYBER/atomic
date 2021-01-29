import { StoreApi } from "zustand";
import { Store } from "store/dist/store";
declare type namespace = string;
declare type definition = string;
export declare type AppCacheIndex = Record<namespace, Record<definition, StoreApi<Store<any>>>>;
export {};
