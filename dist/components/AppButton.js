function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonButton } from '@ionic/react';
import React from 'react';
import { rogueColorToStyle } from "../theme/AppColor";

/**
 * Button Component 
 */
const AppButton = props => {
  return /*#__PURE__*/React.createElement(IonButton, _extends({
    style: props.colorOverride ? rogueColorToStyle(props.colorOverride) : {}
  }, props));
};

export default AppButton;