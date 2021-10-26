function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import AppButton from './AppButton';
import AppList from './AppList';
import { AppItem } from '.';
import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';

/**
 * Component for a select interface via buttons
 */
const AppSelectButtons = ({
  segment,
  allowEmpty,
  selected,
  buttons,
  onSelectionChange,
  multi,
  display = "horizontal"
}) => {
  const selectButtons = buttons.map((button, i) => /*#__PURE__*/React.createElement(AppButton, _extends({
    key: i,
    fill: selected.includes(button.value) ? "solid" : "outline",
    children: button.text || button.value
  }, button, {
    onClick: () => {
      if (multi) {
        const newselected = selected.includes(button.value) ? selected.filter(v => v !== button.value) : [...selected, button.value];
        onSelectionChange(newselected);
      } else {
        const [selectedValue] = selected;
        const isAlreadySelected = selectedValue === button.value && allowEmpty;
        isAlreadySelected ? onSelectionChange([]) : onSelectionChange([button.value]);
      }
    }
  })));

  if (display === "horizontal" && multi === false && segment) {
    return /*#__PURE__*/React.createElement(IonSegment, null, buttons.map(({
      text,
      value,
      color,
      fill,
      disabled
    }) => disabled ? /*#__PURE__*/React.createElement(React.Fragment, null) : /*#__PURE__*/React.createElement(IonSegmentButton, {
      color: color,
      value: value
    }, /*#__PURE__*/React.createElement(IonLabel, {
      color: fill
    }, text))));
  }

  return display === "horizontal" ? /*#__PURE__*/React.createElement(React.Fragment, null, selectButtons) : /*#__PURE__*/React.createElement(AppList, null, selectButtons.map((button, i) => /*#__PURE__*/React.createElement(AppItem, {
    key: i
  }, button)));
};

export default AppSelectButtons;