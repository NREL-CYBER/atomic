import React, { memo, useState } from "react";
import useTimeout from "use-timeout";
import useIndexDBStorage from "../../hooks/useLocalSerialization";
import { useEffect } from "@storybook/addons";

const AppLocalSerializer = ({
  cache,
  serialization
}) => {
  //TODO implement encryption
  const {
    synchronize
  } = useIndexDBStorage();
  const [booting, setIsBooting] = useState(true);
  const [synchronized, setSynchronized] = useState(false);
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
    setSynchronized(true);
  }, [booting, cache, synchronize, synchronized]);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

export default /*#__PURE__*/memo(AppLocalSerializer);