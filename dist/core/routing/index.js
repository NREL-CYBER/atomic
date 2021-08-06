/**
 *  Storing a route with an icon title and references to nested routes.
 */

/**
 *  concatenate an ID onto a dynamic route.
 *  When we need more advanced routing techniques
 *  lets expand this function, 
 *  for filtering lets prefer the use ?searchParams
 */
const destination = (route, params) => {
  let {
    path
  } = route;
  Object.entries(params).sort(([a], [b]) => a.length - b.length).forEach(([param, value]) => {
    path = path.replace(":" + param, value);
  });
  return path;
};

export { destination };