import React, { useEffect, useState } from 'react';
import { AppItem, AppLabel, AppText } from '..';
import { prettyTitle } from '../../util';
import { AppDateTime } from '../AppDateTime';
const inputStatusColorMap = {
  empty: "medium",
  valid: "favorite",
  invalid: "danger"
};
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

    const [validationStatus, validationErrors] = onChange(property, value);
    setInputStatus(validationStatus);
    setErrors(validationErrors || []);
  }, [onChange, property, value]);
  const statusColor = inputStatusColorMap[inputStatus];
  const dateTimeFormat = format === "date-time" ? "YYYY-MM-DDTHH:mm:ssTZD" : "YYYY-MM-DD";
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
  })), errors && errors.length > 0 && /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppLabel, {
    position: "stacked",
    color: "danger"
  }, errors.map((error, i) => /*#__PURE__*/React.createElement(AppText, {
    key: i
  }, error)))));
};

export default AppFormDateTimePicker;