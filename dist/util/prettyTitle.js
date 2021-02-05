/**
 * Make the first char in a string caps
 * @param str string to Uppercase
 */
const prettyTitle = (str = "") => (str.charAt(0).toUpperCase() + str.slice(1)).split("_").join(" ");

export default prettyTitle;