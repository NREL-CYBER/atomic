/**
 * a struct to contain info about an erroneous query
 */
export type QueryError<T> = {
    property: string;
    message: string;
}
/* 
    queries return a two element array
    containing results, and errors.
    if a errors are defined display them to the user

    example usage:

    const [control,queryError] = retrieveControl('AC-1')
        if (queryError){
            console.log(queryError.message)
        }        
    */
export type Query<Origin, Target, Arguments> = (origin: Origin, args: Arguments) => [Target | undefined, QueryError<Origin> | undefined];

/* 
    the result of a query
*/
export type result<Origin, Target> = Target | QueryError<Origin>;
