/**
 *
 * @param removeMatchingPredicate Remove elements matching this predicate
 * @param fromArray from array
 */
declare const remove: <T>(removeMatchingPredicate: (item: T) => boolean, fromArray: T[]) => T[];
export declare const removeAtIndex: <T>(index: number, fromArray: T[]) => T[];
export default remove;
