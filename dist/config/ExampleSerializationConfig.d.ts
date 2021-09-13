import { Store } from "store";
import { StoreListener } from "store/dist/store";
export declare const connect: () => Promise<string>;
export declare const listener: (namespace: string, collection: string) => StoreListener<any>;
export declare const preload: (namespace: string, StoreApi: () => Store<any>) => Promise<string>;
