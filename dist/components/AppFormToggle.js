import React, { useState } from 'react';
import { AppButtons, AppFormLabel } from '.';
import titleCase from '../util/titleCase';
import { inputStatusColorMap } from './AppFormInput';
import AppItem from './AppItem';
import AppLabel from './AppLabel';
import AppSelectButtons from './AppSelectButtons';
import AppText from './AppText';

/**
 * Component for toggle that displays validation errors
 */
const AppFormToggle = props => {
  const {
    propertyInfo,
    instanceRef,
    onChange,
    property,
    required
  } = props;
  const val = instanceRef.current[property];
  const isBoolean = typeof instanceRef.current[property] === "boolean";
  const [errors, setErrors] = useState(undefined);
  const [inputStatus, setInputStatus] = useState(isBoolean ? "valid" : "empty");
  const [checked, setChecked] = useState(isBoolean ? val : undefined);
  const propertyFormattedName = titleCase(propertyInfo.title ? propertyInfo.title : propertyInfo.description ? propertyInfo.description : property);
  const inputStatusColor = inputStatusColorMap[inputStatus];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppFormLabel, {
    required: required,
    name: propertyFormattedName,
    color: inputStatusColor
  }), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "start"
  }, /*#__PURE__*/React.createElement(AppSelectButtons, {
    selected: typeof checked === "undefined" ? [] : checked ? ["true"] : ["false"],
    onSelectionChange: selection => {
      const isChecked = selection.includes("true");
      selection.length > 0 && setChecked(isChecked);
      onChange(property, isChecked).then(([validationStatus, validationErrors]) => {
        setInputStatus(validationStatus);
        setErrors(validationErrors);
      });
    },
    buttons: [{
      color: "success",
      text: "True",
      value: "true"
    }, {
      color: "danger",
      text: "False",
      value: "false"
    }]
  }))), /*#__PURE__*/React.createElement(AppLabel, {
    position: "stacked",
    color: "danger"
  }, errors && errors.map(error => /*#__PURE__*/React.createElement(AppText, null, error))));
};

export default AppFormToggle;