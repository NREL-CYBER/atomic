function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonReorder, IonReorderGroup } from "@ionic/react";
export const AppReorder = props => {
  return /*#__PURE__*/React.createElement(IonReorder, props);
};
export const AppReorderGroup = props => {
  return /*#__PURE__*/React.createElement(IonReorderGroup, _extends({
    onIonItemReorder: props.onReorder ? props.onReorder : undefined
  }, props));
};