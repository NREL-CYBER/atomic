function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import AppButton from './AppButton';
import AppList from './AppList';
import { AppItem } from '.';

/**
 * Component for a select interface via buttons
 */
const AppSelectButtons = ({
  selected,
  buttons,
  onSelectionChange,
  multi,
  display = "row"
}) => {
  const selectButtons = buttons.map(button => /*#__PURE__*/React.createElement(AppButton, _extends({
    fill: selected.includes(button.value) ? "solid" : "outline",
    children: button.text
  }, button, {
    onClick: () => {
      if (multi) {
        const newselected = selected.includes(button.value) ? selected.filter(v => v !== button.value) : [...selected, button.value];
        onSelectionChange(newselected);
      } else {
        onSelectionChange([button.value]);
      }
    }
  })));
  return display === "row" ? /*#__PURE__*/React.createElement(React.Fragment, null, selectButtons) : /*#__PURE__*/React.createElement(AppList, null, selectButtons.map(button => /*#__PURE__*/React.createElement(AppItem, null, button)));
};

export default AppSelectButtons;