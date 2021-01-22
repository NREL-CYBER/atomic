/**
 *  A Calculated field function Similar to a selector, 
 *  but we must return a default value 
 *  so we don't have to check if its undefined.
 */
export type calculated<Origin, Target> = (origin: Origin) => Target;