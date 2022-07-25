function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonRouterOutlet } from '@ionic/react';
import React from 'react';
/**
 * Component for the routing of all the root pages
 */

const AppPageRouterOutlet = props => /*#__PURE__*/React.createElement(IonRouterOutlet, _extends({
  id: "main",
  animated: false
}, props));

export default AppPageRouterOutlet;