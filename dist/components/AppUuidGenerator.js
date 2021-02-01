import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
const inputStatusColorMap = {
  empty: "dark",
  valid: "favorite",
  invalid: "danger"
};
/**
 * Component for input that displays validation errors
 */

const AppUuidGenerator = props => {
  const {
    instanceRef
  } = props;
  const property = "uuid";

  if (instanceRef.current.uuid === undefined) {
    instanceRef.current.uuid = uuidv4();
  }

  const [value] = useState(instanceRef.current && instanceRef.current[property] || "");
  useEffect(() => {
    const change = {};
    change[property] = value;
    instanceRef.current = { ...instanceRef.current,
      ...change
    };
  }, [instanceRef, value]);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

export default AppUuidGenerator;