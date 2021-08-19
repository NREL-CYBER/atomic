function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonTabBar } from '@ionic/react';
import React from 'react';

/**
 * Component to display text with optional color
 */
const AppText = props => {
  return /*#__PURE__*/React.createElement(IonTabBar, _extends({
    mode: "md"
  }, props));
};

export default AppText;