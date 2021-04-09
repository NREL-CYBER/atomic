function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonTextarea } from '@ionic/react';
import React from 'react';

/**
 * Component to display text with optional color (onText change debounced by 500ms)
 */
const AppTextArea = ({
  onTextChange,
  ...props
}) => {
  return /*#__PURE__*/React.createElement(IonTextarea, _extends({
    autoGrow: true,
    debounce: 500,
    onIonChange: event => {
      onTextChange(event.detail.value);
    }
  }, props));
};

export default AppTextArea;