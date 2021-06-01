function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { IonSelectOption } from '@ionic/react';

/**
 * Component for a selection option
 */
const AppSelectOption = props => {
  return /*#__PURE__*/React.createElement(IonSelectOption, _extends({}, props, {
    children: props.children ? props.children : props.value
  }));
};

export default AppSelectOption;