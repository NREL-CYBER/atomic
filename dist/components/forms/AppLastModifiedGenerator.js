import React from 'react';

const AppLastModifiedGenerator = props => {
  const {
    instanceRef
  } = props;
  instanceRef.current.last_modified = new Date().toISOString();
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

export default AppLastModifiedGenerator;