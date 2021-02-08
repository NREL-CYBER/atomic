import React, { memo } from "react";
import useFirebaseStorage from "../../hooks/useFirebaseSerialization";

const AppCloudSerializer = ({
  cache,
  uid,
  cloud
}) => {
  const cloudSerializer = useFirebaseStorage(cloud);
  const {
    synchronize
  } = cloudSerializer();

  if (uid === undefined) {
    return /*#__PURE__*/React.createElement(React.Fragment, null);
  }

  Object.entries(cache).forEach(([namespace, collections]) => {
    Object.values(collections).forEach(storeAPI => {
      synchronize(storeAPI.getState, uid);
    });
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

export default /*#__PURE__*/memo(AppCloudSerializer);