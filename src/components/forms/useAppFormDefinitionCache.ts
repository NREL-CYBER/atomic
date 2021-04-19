import Validator from "validator";
import create from "zustand";

type appFormDefinitionValidatorCache = {
    definitions: Record<string, Validator<any>>
    retrieveDefinitionValidator: (validator: Validator<any>, definition: string) => Validator<any> | undefined
    lazyLoadDefinitionValidator: (validator: Validator<any>, definition: string) => Promise<Validator<any>>
}

const useAppFormDefinitionValidatorCache = create<appFormDefinitionValidatorCache>((set, store) => ({
    definitions: {},
    retrieveDefinitionValidator: (validator, definition) => {
        const path = validator.rootSchema.$id! + definition;
        return store().definitions[path];
        ;
    },
    lazyLoadDefinitionValidator: (validator, definition) => {
        const path = validator.rootSchema.$id! + definition;
        return new Promise((resolve) => {
            const cachedValidator = store().definitions[path];
            if (typeof cachedValidator === "undefined") {
                const freshValidator = validator.makeReferenceValidator({ $ref: definition });
                set({ definitions: { ...store().definitions, [path]: freshValidator } })
                resolve(freshValidator);
            } else {
                resolve(cachedValidator)
            }
        })
    }
}));
export default useAppFormDefinitionValidatorCache;