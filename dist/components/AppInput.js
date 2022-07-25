function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable react-hooks/rules-of-hooks */
import { IonInput } from '@ionic/react';
import React from 'react';

/**
 * Component for text input
 */
const AppInput = props => {
  return /*#__PURE__*/React.createElement(IonInput, _extends({
    onIonBlur: ({
      target
    }) => {
      props.onInputBlur && props.onInputBlur(target.value);
    },
    debounce: props.debounce || 200
  }, props, {
    onIonChange: ({
      detail
    }) => {
      props.onInputChange && props.onInputChange(detail.value);
    }
  }));
};

export default AppInput;