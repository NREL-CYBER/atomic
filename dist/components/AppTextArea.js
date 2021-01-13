function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonTextarea } from '@ionic/react';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

/**
 * Component to display text with optional color
 */
const AppTextArea = props => {
  let {
    onLoseFocus,
    onTextChange
  } = props;

  if (typeof onLoseFocus === 'undefined') {
    onLoseFocus = () => {
      console.log("unhandled focus event");
    };
  }

  const handleKeyUp = useDebouncedCallback(onLoseFocus, 1000).callback;
  const handleChange = onTextChange ? val => onTextChange(val) : val => {
    console.log("unhandled change event");
  };
  return /*#__PURE__*/React.createElement(IonTextarea, _extends({
    onKeyUp: handleKeyUp,
    onIonChange: event => {
      handleChange(event.detail.value);
    }
  }, props));
};

export default AppTextArea;