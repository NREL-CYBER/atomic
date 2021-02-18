import React, { memo } from "react";
import useIndexDBStorage from "../../hooks/useLocalSerialization";
import useTimeout from "use-timeout";

const AppLocalSerializer = ({
  cache,
  serialization
}) => {
  //TODO implement encryption
  const {
    synchronize
  } = useIndexDBStorage();
  useTimeout(() => {
    console.log("Begin Cache Synchronization");
    Object.entries(cache).forEach(([namespace, collections]) => {
      Object.values(collections).forEach(storeAPI => {
        synchronize(namespace, storeAPI.getState, "anon");
      });
    });
  }, 1000);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

export default /*#__PURE__*/memo(AppLocalSerializer);