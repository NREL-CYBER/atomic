import { useEffect } from "react";
import React from "react";
import useLocalSerialization from "../../hooks/useLocalSerialization";

const AppSerializer = ({
  cache,
  mode,
  preload
}) => {
  const {
    index
  } = cache;
  const {
    synchronize
  } = useLocalSerialization();
  useEffect(() => {
    preload(cache);
    Object.entries(index).forEach(([namespace, collections]) => {
      Object.values(collections).forEach(storeAPI => {
        if (mode === "local") {
          synchronize(namespace, storeAPI.getState);
        }
      });
    });
  }, [cache, index, mode, preload, synchronize]);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

export default AppSerializer;