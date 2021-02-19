import React, { memo, useState } from "react";
import useTimeout from "use-timeout";
import useIndexDBStorage from "../../hooks/useLocalSerialization";
import { useEffect } from "react";
import useCache from "../../hooks/useCache";

const AppLocalSerializer = ({
  cache,
  serialization
}) => {
  //TODO implement encryption
  const {
    synchronize
  } = useIndexDBStorage();
  const [booting, setIsBooting] = useState(true);
  const {
    synchronized,
    ready
  } = useCache();
  useTimeout(() => {
    setIsBooting(false);
  }, 500);
  useEffect(() => {
    if (booting || synchronized) {
      return;
    }

    Object.entries(cache).forEach(([namespace, collections]) => {
      Object.values(collections).forEach(storeAPI => {
        synchronize(namespace, storeAPI.getState, "anon");
      });
    });
    ready();
  }, [booting, cache, ready, synchronize, synchronized]);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

export default /*#__PURE__*/memo(AppLocalSerializer);