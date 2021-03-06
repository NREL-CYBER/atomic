function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonSelect } from '@ionic/react';
import React from 'react';

/**
 * Component for a select interface
 */
const AppSelectMulitple = props => {
  return /*#__PURE__*/React.createElement(IonSelect, _extends({
    multiple: true,
    interface: props.multiple ? "alert" : "popover",
    onIonChange: e => {
      props.onSelectionChange && props.onSelectionChange(props.multiple ? e.detail.value : [e.detail.value]);
    }
  }, props));
};

export default AppSelectMulitple;