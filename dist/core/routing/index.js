/**
 *  Storing a route with an icon title and references to nested routes.
 */

/**
 *  concatenate an ID onto a dynamic route.
 *  When we need more advanced routing techniques
 *  lets expand this function, 
 *  for filtering lets prefer the use ?searchParams
 */
const destination = (route, id) => {
  return route.path + "/" + id;
};

export { destination };