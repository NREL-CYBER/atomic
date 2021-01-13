function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonPopover } from '@ionic/react';
import React from 'react';

/**
 * Component that stores the root of the application and control current theme
 */
const AppPopover = props => /*#__PURE__*/React.createElement(IonPopover, _extends({
  onDidDismiss: () => {
    props.onDismiss();
  }
}, props));

export default AppPopover;