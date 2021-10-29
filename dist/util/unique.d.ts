/**
 * Make a string array only contain unique values
 * simply convert to a set and then back to array
 * @param ray string array to make unique
 */
declare const unique: (ray: string[]) => string[];
/**
 * Deeply check the uniqueness of objects by stringifying them
 */
export declare const uniqueObjects: (ray: any[]) => any[];
/**
* remove objects via hash match
*/
export declare const removeObjectFromArray: (ray: any[], obj: any) => any[];
export default unique;
