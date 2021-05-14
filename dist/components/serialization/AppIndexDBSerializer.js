import React, { memo, useState } from "react";
import useTimeout from "use-timeout";
import useIndexDBStorage from "../../hooks/useLocalSerialization";
import { useEffect } from "react";
import useCache from "../../hooks/useCache";

const AppIndexDBSerializer = ({
  cache,
  serialization
}) => {
  //TODO implement encryption
  const {
    synchronize
  } = useIndexDBStorage();
  const [booting, setIsBooting] = useState(true);
  const {
    status,
    ready
  } = useCache();
  useTimeout(() => {
    setIsBooting(false);
  }, 500);
  useEffect(() => {
    if (booting || status === "idle") {
      return;
    }

    Object.entries(cache).forEach(([namespace, collections]) => {
      Object.values(collections).forEach(storeAPI => {
        synchronize(serialization, namespace, storeAPI.getState, "anon");
      });
    });
    ready();
  }, [booting, cache, ready, serialization, status, synchronize]);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

export default /*#__PURE__*/memo(AppIndexDBSerializer);