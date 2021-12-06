import React, { memo, useEffect, useState } from "react";
import useAppLayout from "../../hooks/useAppLayout";
import useCache from "../../hooks/useCache";
export const InitializeSynchronization = async (cache, serialization, uid, synchronize, onComplete) => {
  if (serialization.synchronization) {
    await serialization.synchronization.connect();
  }

  Object.entries(cache).forEach(([namespace, collections]) => {
    Object.values(collections).forEach(storeAPI => {
      var _serialization$synchr, _serialization$synchr2;

      const {
        collection
      } = storeAPI.getState();
      const customSynchronizer = (_serialization$synchr = serialization.synchronization) === null || _serialization$synchr === void 0 ? void 0 : _serialization$synchr.listener(namespace, collection);
      const customPreloader = (_serialization$synchr2 = serialization.synchronization) === null || _serialization$synchr2 === void 0 ? void 0 : _serialization$synchr2.preload(namespace, storeAPI.getState);

      if (customSynchronizer && customPreloader) {
        customPreloader.then(() => {
          storeAPI.getState().addListener(customSynchronizer);
          onComplete();
        });
      } else {
        synchronize(serialization, namespace, storeAPI.getState, uid, onComplete);
      }
    });
  });
};

const AppLocalSerializer = ({
  cache,
  context,
  serialization,
  uid = ""
}) => {
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
    if (remaining <= 0) {
      setStatus("idle");
      ready();
    }
  }, [ready, remaining, setStatus]);
  useEffect(() => {
    if (status !== "synchronizing") {
      return;
    }

    InitializeSynchronization(cache, serialization, uid, synchronize, () => {
      setRemaining(x => x - 1);
    });
  }, [cache, serialization, status, synchronize, uid]);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

export default /*#__PURE__*/memo(AppLocalSerializer);