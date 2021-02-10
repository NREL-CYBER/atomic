import { RootSchemaObject } from "validator";
declare type fileStorageApi = {
    insert: (file: File, URI: string) => Promise<string>;
    fetch: (URI: string) => Promise<File>;
    delete: (URI: string) => void;
};
export declare type fileStorageContext = fileStorageApi & {
    provider: string;
    configure: (api: fileStorageApi, provider: string) => void;
};
export declare const fileSchema: RootSchemaObject;
export declare const usefileStore: import("zustand").UseStore<import("store").Store<File>>;
/**
 * Observe an Entity collection in cloud storage
 */
declare const useFileStorage: import("zustand").UseStore<fileStorageContext>;
export default useFileStorage;
