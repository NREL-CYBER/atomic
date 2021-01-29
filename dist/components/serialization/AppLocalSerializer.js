import React, { memo, useEffect } from "react";
import useLocalSerialization from "../../hooks/useLocalSerialization";

const AppLocalSerializer = ({
  cache
}) => {
  const {
    index
  } = cache;
  const synchronizeWithLocalStorage = useLocalSerialization(x => x.synchronize);
  useEffect(() => {
    Object.entries(index).forEach(([namespace, collections]) => {
      Object.values(collections).forEach(storeAPI => {
        synchronizeWithLocalStorage(namespace, storeAPI.getState);
      });
    });
  }, [index, synchronizeWithLocalStorage]);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

export default memo(AppLocalSerializer);