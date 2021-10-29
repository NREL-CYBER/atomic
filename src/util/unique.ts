/**
 * Make a string array only contain unique values
 * simply convert to a set and then back to array
 * @param ray string array to make unique
 */
const unique = (ray: string[]) => Array.from(new Set(ray));


/**
 * Deeply check the uniqueness of objects by stringifying them
 */
export const uniqueObjects = (ray: any[]) =>
    Object.values(
        ray
            .map((item) => ({
                [btoa(JSON.stringify(item))]: item
            }))
            .reduce(
                (a, b) =>
                    ({ ...a, ...b }),
                {}
            )
    );


/**
* remove objects via hash match
*/
export const removeObjectFromArray = (ray: any[], obj: any) => {
    const obj_key = btoa(JSON.stringify(obj))
    return Object.values(
        ray
            .map(
                (item) => {
                    const item_key = btoa(JSON.stringify(item));
                    return {
                        [item_key]: item_key === obj_key ? null : item
                    }
                })
            .filter(Boolean)
            .reduce(
                (a, b) =>
                    ({ ...a, ...b }),
                {}
            ))

};



export default unique;