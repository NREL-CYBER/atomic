import React, { memo } from "react";
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
  preload(cache);
  Object.entries(index).forEach(([namespace, collections]) => {
    Object.values(collections).forEach(storeAPI => {
      synchronize(namespace, storeAPI.getState);
    });
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

export default memo(AppSerializer);