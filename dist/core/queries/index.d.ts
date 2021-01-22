/**
 * a struct to contain info about an erroneous query
 */
export declare type QueryError<T> = {
    property: string;
    message: string;
};
export declare type Query<Origin, Target, Arguments> = (origin: Origin, args: Arguments) => [Target | undefined, QueryError<Origin> | undefined];
export declare type result<Origin, Target> = Target | QueryError<Origin>;
