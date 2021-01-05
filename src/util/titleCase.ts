/**
 * Make the first char in a string caps
 * @param str string to Uppercase
 */
const titleCase = (str: string) => (str.charAt(0).toUpperCase() + str.slice(1));
export default titleCase;