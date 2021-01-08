/**
 * 
 * @param removeMatchingPredicate Remove elements matching this predicate
 * @param fromArray from array
 */
const remove = (removeMatchingPredicate, fromArray) => {
  return [...fromArray.filter(item => !removeMatchingPredicate(item))];
};

export default remove;