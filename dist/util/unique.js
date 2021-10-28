/**
 * Make a string array only contain unique values
 * simply convert to a set and then back to array
 * @param ray string array to make unique
 */
const unique = ray => Array.from(new Set(ray));
/**
 * Deeply check the uniqueness of objects by stringing them
 * Deeply check the uniqueness of objects by stringing them
 */


export const uniqueObjects = ray => Object.values(ray.map(item => ({
  [btoa(JSON.stringify(item))]: item
})).reduce((a, b) => ({ ...a,
  ...b
}), {}));
export default unique;