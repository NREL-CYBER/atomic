function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonSelect } from '@ionic/react';
import React from 'react';

/**
 * Component for a select interface for selecting a single string
 */
const AppSelectString = props => {
  return /*#__PURE__*/React.createElement(IonSelect, _extends({
    style: {
      color: "var(--ion-color-" + props.color + ",yellow)",
      "--color": "var(--ion-color-" + props.color + ")",
      "--placeholder-color": "var(--ion-color-" + props.color + ")"
    },
    onIonChange: e => {
      props.onSelectionChange && props.onSelectionChange(e.detail.value);
    }
  }, props));
};

export default AppSelectString;