/**
 * Make the first char in a string caps
 * @param str string to Uppercase
 */
const prettyTitle = (str: string = "") => ((str).charAt(0).toUpperCase() + str.slice(1)).split("_").join(" ").split("-").join(" ");
export default prettyTitle;