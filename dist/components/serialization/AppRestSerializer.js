import React, { memo, useEffect, useState } from "react";
import useTimeout from "use-timeout";
import useCache from "../../hooks/useCache";
import { useRestSerializeation } from "../../hooks/useRestSerialization";
import useAppAccount from "../../hooks/useAppAccount";

const AppRestSerializer = ({
  cache,
  serialization
}) => {
  const {
    synchronize
  } = useRestSerializeation();
  const [booting, setIsBooting] = useState(true);
  const {
    synchronized,
    ready
  } = useCache();
  const {
    uid,
    authProvider
  } = useAppAccount();
  useTimeout(() => {
    setIsBooting(false);
  }, 200);
  useEffect(() => {
    if (booting || synchronized || typeof uid === "undefined" && typeof authProvider !== "undefined") {
      return;
    }

    Object.entries(cache).forEach(([namespace, collections]) => {
      Object.values(collections).forEach(storeAPI => {
        synchronize(serialization, namespace, storeAPI.getState, uid || "");
      });
    });
    ready();
  }, [authProvider, booting, cache, ready, serialization, synchronize, synchronized, uid]);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

export default /*#__PURE__*/memo(AppRestSerializer);