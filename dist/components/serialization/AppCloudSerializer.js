import React, { memo } from "react";
import useFirebaseStorage from "../../hooks/useFirebaseSerialization";
import useTimeout from "use-timeout";

const AppCloudSerializer = ({
  cache,
  uid,
  cloud
}) => {
  const cloudSerializer = useFirebaseStorage(cloud);
  const {
    synchronize
  } = cloudSerializer();
  useTimeout(() => {
    if (uid === undefined) {
      return;
    }

    Object.entries(cache).forEach(([namespace, collections]) => {
      Object.values(collections).forEach(storeAPI => {
        synchronize(storeAPI.getState, uid);
      });
    });
  }, 500);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

export default /*#__PURE__*/memo(AppCloudSerializer);