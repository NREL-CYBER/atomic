import React from 'react';
import { v4 as uuidv4 } from "uuid";

/**
 * Component for input that displays validation errors
 */
const AppUuidGenerator = ({
  instanceRef
}) => {
  if (instanceRef.current.uuid === undefined) {
    instanceRef.current.uuid = uuidv4();
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

export default AppUuidGenerator;