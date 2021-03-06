function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonTextarea } from '@ionic/react';
import React from 'react';

/**
 * Component to display text with optional color (onText change debounced by 500ms)
 * if you want to use any other params feel free to add them in text props:
 * https://ionicframework.com/docs/api/textarea
 * As it says in ionic doc, this is not for inline children text, set the inner value by using the value param
 */
const AppTextArea = ({
  onTextChange,
  rows = 2,
  ...props
}) => {
  const isLong = JSON.stringify(props.value || "").length > 100;
  return /*#__PURE__*/React.createElement(IonTextarea, _extends({
    style: {
      minHeight: "100px!important"
    },
    debounce: 100,
    autoGrow: isLong,
    rows: rows,
    onIonChange: event => {
      onTextChange(event.detail.value);
    }
  }, props));
};

export default AppTextArea;