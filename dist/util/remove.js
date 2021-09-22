/**
 * 
 * @param removeMatchingPredicate Remove elements matching this predicate
 * @param fromArray from array
 */
const remove = (removeMatchingPredicate, fromArray) => {
  return [...fromArray.filter(item => !removeMatchingPredicate(item))];
};

export const removeAtIndex = (index, fromArray) => {
  return [...fromArray.filter((_, i) => index !== i)];
};
export default remove;