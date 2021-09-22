
/**
 * 
 * @param removeMatchingPredicate Remove elements matching this predicate
 * @param fromArray from array
 */
const remove = <T>(removeMatchingPredicate: (item: T) => boolean, fromArray: Array<T>) => {
    return [...fromArray.filter((item) => !removeMatchingPredicate(item))];
}
export const removeAtIndex = <T>(index: number, fromArray: Array<T>) => {
    return [...fromArray.filter((_, i) => index !== i)];
}


export default remove;
