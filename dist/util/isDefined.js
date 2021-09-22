export const isDefined = item => typeof item !== "undefined";
export const isUndefined = item => typeof item === "undefined";
export const isNumber = item => typeof item === "number";
export const isObject = item => typeof item === "object" && item !== null;
export const isNull = item => item === null;