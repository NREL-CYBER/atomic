import { AppCol } from 'atomic';
import React, { useState } from 'react';
import { prettyTitle } from '../util';
import { inputStatusColorMap } from './AppFormInput';
import AppItem from './AppItem';
import AppSelectButtons from './AppSelectButtons';
import { AppFormErrorsItem } from './forms/AppFormErrorsItem';
import { AppFormLabel } from './forms/AppFormLabel';

/**
 * Component for input that displays validation errors
 */
const AppFormSelect = props => {
  const {
    propertyInfo,
    instanceRef,
    onChange,
    property,
    required
  } = props;
  const [errors, setErrors] = useState(undefined);
  const [inputStatus, setInputStatus] = useState(instanceRef.current && typeof instanceRef.current[property] === "undefined" ? "empty" : "valid");
  let instanceValue = instanceRef.current && instanceRef.current[property];
  const [value, setValue] = useState(instanceValue);
  const propertyFormattedName = prettyTitle(propertyInfo.title ? propertyInfo.title : property);
  const statusColor = inputStatusColorMap[inputStatus];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppFormLabel, {
    required: required,
    name: propertyFormattedName,
    color: statusColor
  }), /*#__PURE__*/React.createElement(AppCol, null, /*#__PURE__*/React.createElement(AppSelectButtons, {
    display: propertyInfo.enum.length > 4 ? "vertical" : "horizontal",
    segment: true,
    selected: [value],
    onSelectionChange: ([val]) => {
      setValue(val);
      onChange(property, val).then(([validationStatus, validationErrors]) => {
        setInputStatus(validationStatus);
        setErrors(validationErrors);
      });
    },
    buttons: propertyInfo.enum.map(enumValue => ({
      color: value === enumValue ? "favorite" : "medium",
      value: enumValue,
      text: prettyTitle(enumValue)
    }))
  }))), /*#__PURE__*/React.createElement(AppFormErrorsItem, {
    errors: errors
  }));
};

export default AppFormSelect;