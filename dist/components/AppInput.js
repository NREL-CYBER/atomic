function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable react-hooks/rules-of-hooks */
import { IonInput } from '@ionic/react';
import React from 'react';

/**
 * Component for text input
 */
const AppInput = props => {
  return /*#__PURE__*/React.createElement(IonInput, _extends({
    debounce: 500
  }, props, {
    onIonChange: e => {
      props.onInputChange && props.onInputChange(e.detail.value);
    }
  }));
};

export default AppInput;