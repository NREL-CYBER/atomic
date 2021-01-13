import { RootSchemaObject } from "validator";
export interface AppCacheConfig<AppCacheCollections> {
    schemas: RootSchemaObject[];
    cacheIndex: AppCacheCollections;
}
export declare type AppCacheIndex = Record<string, unknown>;
