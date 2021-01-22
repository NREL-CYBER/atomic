/**
 *  concatenate an ID onto a dynamic route.
 *  When we need more advanced routing techniques
 *  lets expand this function,
 *  for filtering lets prefer the use ?searchParams
 */
declare const destination: (route: any, id: string) => string;
export default destination;
