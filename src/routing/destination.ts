import AppRoute from "./AppRoute";

/**
 *  concatenate an ID onto a dynamic route.
 *  When we need more advanced routing techniques
 *  lets expand this function, 
 *  for filtering lets prefer the use ?searchParams
 */
const destination = (route: AppRoute, id: string) => {
    return route.path + "/" + id;
}
export default destination;