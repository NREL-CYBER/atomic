function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonItemDivider } from '@ionic/react';
import React from 'react';

/**
 * A text label
 */
const AppItemDivider = props => {
  return /*#__PURE__*/React.createElement(IonItemDivider, _extends({
    color: props.color ? props.color : "paper"
  }, props));
};

export default AppItemDivider;