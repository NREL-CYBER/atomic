import { useEffect } from "react";
import React from "react";

const AppSerializer = ({
  cache
}) => {
  useEffect(() => {
    Object.entries(cache).forEach(([collection, store]) => {
      console.log("Watching " + collection);
    });
  }, [cache]);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

export default AppSerializer;