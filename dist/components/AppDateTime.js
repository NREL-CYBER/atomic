function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonDatetime } from "@ionic/react";
import React from "react";
export const AppDateTime = props => /*#__PURE__*/React.createElement(IonDatetime, _extends({
  pickerFormat: "",
  onIonChange: e => {
    props.onDateEntered(e.detail.value);
  }
}, props));