import React, { memo, useEffect } from "react";
import useIndexDBStorage from "../../hooks/useLocalSerialization";

const AppLocalSerializer = ({
  cache
}) => {
  const {
    index
  } = cache;
  const {
    synchronize
  } = useIndexDBStorage();
  useEffect(() => {
    Object.entries(index).forEach(([namespace, collections]) => {
      Object.values(collections).forEach(storeAPI => {
        synchronize(namespace, storeAPI.getState, "anonymous");
      });
    });
  }, [index, synchronize]);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

export default /*#__PURE__*/memo(AppLocalSerializer);