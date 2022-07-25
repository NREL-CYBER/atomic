function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonToggle } from '@ionic/react';
import React from 'react';

/**
 * Component to get booleans from the user
 */
const AppToggle = props => {
  return /*#__PURE__*/React.createElement(IonToggle, _extends({
    onIonChange: e => {
      props.onToggleChange && props.onToggleChange(e.detail.checked);
    }
  }, props));
};

export default AppToggle;