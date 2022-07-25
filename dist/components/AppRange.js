function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonRange } from '@ionic/react';
import React from 'react';
import { isNumber } from "../util";

/**
 * Range Slider component, behaves like you expect!
 */
const AppRange = props => /*#__PURE__*/React.createElement(IonRange, _extends({
  onIonChange: e => {
    if (isNumber(e.detail.value)) {
      props.onValueChange && props.onValueChange(e.detail.value);
    } else {
      props.onRangeChange && props.onRangeChange(e.detail.value);
    }
  }
}, props));

export default AppRange;