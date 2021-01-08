"use strict";
exports.__esModule = true;
/**
 *  concatenate an ID onto a dynamic route.
 *  When we need more advanced routing techniques
 *  lets expand this function,
 *  for filtering lets prefer the use ?searchParams
 */
var destination = function (route, id) {
    return route.path + "/" + id;
};
exports["default"] = destination;
