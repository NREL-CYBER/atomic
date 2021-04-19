import create from "zustand";
const useAppFormDefinitionValidatorCache = create((set, store) => ({
  definitions: {},
  retrieveDefinitionValidator: (validator, definition) => {
    const path = validator.rootSchema.$id + definition;
    return store().definitions[path];
    ;
  },
  lazyLoadDefinitionValidator: (validator, definition) => {
    const path = validator.rootSchema.$id + definition;
    return new Promise(resolve => {
      const cachedValidator = store().definitions[path];

      if (typeof cachedValidator === "undefined") {
        const freshValidator = validator.makeReferenceValidator({
          $ref: definition
        });
        set({
          definitions: { ...store().definitions,
            [path]: freshValidator
          }
        });
        resolve(freshValidator);
      } else {
        resolve(cachedValidator);
      }
    });
  }
}));
export default useAppFormDefinitionValidatorCache;