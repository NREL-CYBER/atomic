import React, { memo } from "react";
import useIndexDBStorage from "../../hooks/useLocalSerialization";

const AppLocalSerializer = ({
  cache,
  serialization
}) => {
  //TODO implement encryption
  const {
    synchronize
  } = useIndexDBStorage();
  Object.entries(cache).forEach(([namespace, collections]) => {
    Object.values(collections).forEach(storeAPI => {
      synchronize(namespace, storeAPI.getState, "anon");
    });
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

export default /*#__PURE__*/memo(AppLocalSerializer);