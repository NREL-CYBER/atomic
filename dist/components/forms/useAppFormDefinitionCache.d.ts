import Validator from "validator";
declare type appFormDefinitionValidatorCache = {
    definitions: Record<string, Validator<any>>;
    retrieveDefinitionValidator: (validator: Validator<any>, definition: string) => Validator<any> | undefined;
    lazyLoadDefinitionValidator: (validator: Validator<any>, definition: string) => Promise<Validator<any>>;
};
declare const useAppFormDefinitionValidatorCache: import("zustand").UseStore<appFormDefinitionValidatorCache>;
export default useAppFormDefinitionValidatorCache;
