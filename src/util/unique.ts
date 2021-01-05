/**
 * Make a string array only contain unique values
 * simply convert to a set and then back to array
 * @param ray string array to make unique
 */
const unique = (ray: string[]) => Array.from(new Set(ray));
export default unique;