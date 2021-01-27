function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect } from 'react';
import AppButton from './AppButton';

/**
 * Component for a select interface via buttons
 */
const AppSelectButtons = ({
  data,
  buttons,
  onSelectionChange,
  multi
}) => {
  const [values, setValues] = useState(data || []);
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    initialized && onSelectionChange(values);
    setInitialized(true); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSelectionChange, values]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, buttons.map(button => /*#__PURE__*/React.createElement(AppButton, _extends({
    fill: values.includes(button.value) ? "solid" : "outline",
    children: button.text
  }, button, {
    onClick: () => {
      if (multi) {
        const newValues = values.includes(button.value) ? values.filter(v => v !== button.value) : [...values, button.value];
        setValues(newValues);
      } else {
        setValues([button.value]);
      }
    }
  }))));
};

export default AppSelectButtons;