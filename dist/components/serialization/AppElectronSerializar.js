import { memo, useEffect, useState } from "react";
import useTimeout from "use-timeout";
import useCache from "../../hooks/useCache";
import useElectronSerialization from "../../hooks/useElectronSerialization";

const AppElectronSerializer = ({
  cache,
  serialization
}) => {
  //TODO implement encryption
  const {
    synchronize
  } = useElectronSerialization();
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
        synchronize(serialization, namespace, storeAPI.getState, "uid");
      });
    });
    ready();
  }, [booting, cache, ready, serialization, status, synchronize]);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

export default /*#__PURE__*/memo(AppElectronSerializer);