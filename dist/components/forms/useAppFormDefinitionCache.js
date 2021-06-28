import create from "zustand";
const useAppFormDefinitionValidatorCache = create((set, store) => ({
  definitions: {},
  retrieveDefinitionValidator: (validator, definition) => {
    const path = validator.rootSchema.$id + definition;
    return store().definitions[path];
    ;
  },
  lazyLoadDefinitionValidator: (validator, definition) => {
    console.log("Lazy loading definition");
    const path = validator.rootSchema.$id + definition;
    return new Promise(async resolve => {
      const cachedValidator = store().definitions[path];

      if (typeof cachedValidator === "undefined") {
        const freshValidator = await validator.makeReferenceValidator({
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