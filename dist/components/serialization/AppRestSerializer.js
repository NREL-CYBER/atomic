import React, { memo, useEffect, useState } from "react";
import useTimeout from "use-timeout";
import useCache from "../../hooks/useCache";
import { useRestSerializeation } from "../../hooks/useRestSerialization";

const AppRestSerializer = ({
  cache,
  serialization
}) => {
  const {
    synchronize
  } = useRestSerializeation(serialization);
  const [booting, setIsBooting] = useState(true);
  const {
    synchronized,
    ready
  } = useCache();
  useTimeout(() => {
    setIsBooting(false);
  }, 200);
  useEffect(() => {
    if (booting || synchronized) {
      return;
    }

    Object.entries(cache).forEach(([namespace, collections]) => {
      Object.values(collections).forEach(storeAPI => {
        synchronize(namespace, storeAPI.getState, "uid");
      });
    });
    ready();
  }, [booting, cache, ready, synchronize, synchronized]);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

export default /*#__PURE__*/memo(AppRestSerializer);