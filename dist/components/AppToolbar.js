function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonToolbar } from '@ionic/react';
import React from 'react';

/**
 * Toolbar component!
 * This once also works great with the AppButtons Component.
 * We use this on the top bar, but we might have a footer later on as well.
 */
const AppToolbar = ({
  color,
  ...props
}) => {
  return /*#__PURE__*/React.createElement(IonToolbar, _extends({
    color: color ? color : "clear"
  }, props));
};

export default AppToolbar;