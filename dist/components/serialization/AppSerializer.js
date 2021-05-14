import useCache from "../../hooks/useCache";
import React, { memo, useEffect, useState } from "react";
import useAppLayout from "../../hooks/useAppLayout";

const AppLocalSerializer = ({
  cache,
  serialization,
  context,
  uid
}) => {
  //TODO implement encryption
  const {
    synchronize
  } = context();
  const {
    status,
    setStatus
  } = useAppLayout();
  const {
    ready
  } = useCache();
  const cache_items = Object.entries(cache).flatMap(([namespace, collections]) => Object.values(collections).length).reduce((a, b) => a + b, 0);
  const [remaining, setRemaining] = useState(cache_items);
  useEffect(() => {
    if (remaining === 0) {
      setStatus("idle");
      ready();
    }
  }, [ready, remaining, setStatus]);
  useEffect(() => {
    if (status !== "synchronizing") {
      return;
    }

    Object.entries(cache).forEach(([namespace, collections]) => {
      Object.values(collections).forEach(storeAPI => {
        synchronize(serialization, namespace, storeAPI.getState, uid || "secret", () => {
          console.log("Synchronized " + namespace + storeAPI.getState().collection);
          setRemaining(x => x - 1);
        });
      });
    });
  }, [cache, serialization, status, synchronize, uid]);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

export default /*#__PURE__*/memo(AppLocalSerializer);