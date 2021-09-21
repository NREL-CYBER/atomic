import React, { useEffect, useState } from 'react';
import { AppItem, AppLabel } from '..';
import { prettyTitle } from '../../util';
import { AppDateTime } from '../AppDateTime';
import { inputStatusColorMap } from '../AppFormInput';
import { AppFormErrorsItem } from './AppFormErrorsItem';

/**
 * Component for input that displays validation errors
 */
const AppFormDateTimePicker = props => {
  const {
    property,
    instanceRef,
    onChange,
    propertyInfo,
    format = "date"
  } = props;
  const [errors, setErrors] = useState([]);
  const [inputStatus, setInputStatus] = useState("empty");
  const [value, setValue] = useState(instanceRef.current && instanceRef.current[property] || null);
  const propertyFormattedName = prettyTitle(propertyInfo.title || property);
  useEffect(() => {
    if (value === null) {
      return;
    }

    onChange(property, value).then(([validationStatus, validationErrors]) => {
      setInputStatus(validationStatus);
      setErrors(validationErrors || []);
    });
  }, [onChange, property, value]);
  const statusColor = inputStatusColorMap[inputStatus];
  const dateTimeFormat = format === "date-time" ? "YYYY-MM-DDThh:mm:ssZ" : "YYYY-MM-DD";
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppItem, {
    color: "clear",
    lines: "none"
  }, /*#__PURE__*/React.createElement(AppLabel, {
    position: "stacked",
    color: statusColor
  }, propertyFormattedName), /*#__PURE__*/React.createElement(AppDateTime, {
    displayFormat: dateTimeFormat,
    pickerFormat: dateTimeFormat,
    value: value,
    onDateEntered: val => {
      format === "date-time" ? setValue(val) : setValue(val.split("T")[0]);
    }
  })), /*#__PURE__*/React.createElement(AppFormErrorsItem, {
    errors: errors
  }));
};

export default AppFormDateTimePicker;