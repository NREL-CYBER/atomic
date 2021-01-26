import React, { useState } from 'react';
import titleCase from '../util/titleCase';
import AppItem from './AppItem';
import AppLabel from './AppLabel';
import AppText from './AppText';
import { AppToggle, AppButtons } from '.';
export const inputStatusColorMap = {
  empty: "dark",
  valid: "favorite",
  invalid: "danger"
};
/**
 * Component for toggle that displays validation errors
 */

const AppFormToggle = props => {
  const {
    propertyInfo,
    instanceRef,
    onChange,
    property
  } = props;
  const [errors, setErrors] = useState(undefined);
  const [inputStatus, setInputStatus] = useState("empty");
  const [checked, setChecked] = useState(instanceRef.current && instanceRef.current[property] || undefined);
  const propertyFormattedName = titleCase(propertyInfo.title || propertyInfo.description);
  const inputStatusColor = inputStatusColorMap[inputStatus];
  return /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "start"
  }, /*#__PURE__*/React.createElement(AppLabel, {
    position: "stacked",
    color: inputStatusColor
  }, propertyFormattedName), /*#__PURE__*/React.createElement(AppToggle, {
    checked: checked,
    onToggleChange: isChecked => {
      setChecked(isChecked);
      const [validationStatus, validationErrors] = onChange(property, isChecked);
      setInputStatus(validationStatus);
      setErrors(validationErrors);
    }
  })), /*#__PURE__*/React.createElement(AppLabel, {
    position: "stacked",
    color: "danger"
  }, errors && errors.map(error => /*#__PURE__*/React.createElement(AppText, null, error))));
};

export default AppFormToggle;