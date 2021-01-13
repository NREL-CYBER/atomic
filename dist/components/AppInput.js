function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable react-hooks/rules-of-hooks */
import { IonInput } from '@ionic/react';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

/**
 * Component for text input
 */
const AppInput = props => {
  const {
    onLoseFocus
  } = props;
  const handleKeyUp = onLoseFocus ? useDebouncedCallback(onLoseFocus, 1000).callback : () => {};
  return /*#__PURE__*/React.createElement(IonInput, _extends({
    onKeyUp: handleKeyUp
  }, props, {
    onIonChange: e => {
      props.onInputChange && props.onInputChange(e.detail.value);
    }
  }));
};

export default AppInput;