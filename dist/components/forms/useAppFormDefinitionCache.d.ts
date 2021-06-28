import Validator from "validator";
declare type appFormDefinitionValidatorCache = {
    definitions: Record<string, Validator<unknown>>;
    retrieveDefinitionValidator: (validator: Validator<unknown>, definition: string) => Validator<unknown> | undefined;
    lazyLoadDefinitionValidator: (validator: Validator<unknown>, definition: string) => Promise<Validator<unknown>>;
};
declare const useAppFormDefinitionValidatorCache: import("zustand").UseStore<appFormDefinitionValidatorCache>;
export default useAppFormDefinitionValidatorCache;
