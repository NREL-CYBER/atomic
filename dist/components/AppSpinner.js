function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonSpinner } from '@ionic/react';
import React from 'react';
/**
 * Component show a spinner while something is loading
 */

const AppSpinner = props => {
  return /*#__PURE__*/React.createElement(IonSpinner, _extends({
    name: "dots"
  }, props));
};

export default AppSpinner;