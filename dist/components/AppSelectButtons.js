function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonSegment, IonSegmentButton } from '@ionic/react';
import { AppChip, AppText } from 'atomic';
import React from 'react';
import { AppItem } from '.';
import AppButton from './AppButton';
import AppList from './AppList';

/**
 * Component for a select interface via buttons
 */
const AppSelectButtons = props => {
  const {
    segment,
    allowEmpty,
    buttons,
    onSelectionChange,
    multi,
    display = "horizontal"
  } = props;
  const selected = props.selected.filter(Boolean);
  const selectButtons = buttons.map((button, i) => /*#__PURE__*/React.createElement(AppButton, _extends({
    key: i,
    fill: selected.includes(button.value) ? "solid" : "clear",
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

  if (segment && display === "horizontal") {
    return /*#__PURE__*/React.createElement(IonSegment, {
      value: selected[0],
      onIonChange: e => {
        onSelectionChange([e.detail.value]);
      },
      color: "primary"
    }, buttons.map(({
      text,
      value,
      color,
      fill,
      disabled
    }) => disabled ? /*#__PURE__*/React.createElement(React.Fragment, null) : /*#__PURE__*/React.createElement(IonSegmentButton, {
      color: "primary",
      value: value
    }, /*#__PURE__*/React.createElement(AppButton, {
      color: color,
      fill: fill
    }, text))));
  }

  return display === "horizontal" ? /*#__PURE__*/React.createElement(React.Fragment, null, selectButtons) : selected.length === 0 && !multi ? /*#__PURE__*/React.createElement(AppList, null, buttons.map((button, i) => /*#__PURE__*/React.createElement(AppItem, {
    color: "paper",
    key: i,
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
  }, !selected.includes(button.value) ? /*#__PURE__*/React.createElement(AppText, {
    color: button.color
  }, button.text || button.value) : /*#__PURE__*/React.createElement(AppChip, {
    color: button.color
  }, button.text || button.value)))) : /*#__PURE__*/React.createElement(AppItem, {
    onClick: () => {
      onSelectionChange([]);
    }
  }, /*#__PURE__*/React.createElement(AppChip, {
    color: "favorite"
  }, selected));
};

export default AppSelectButtons;