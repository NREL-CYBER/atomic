import React, { useEffect, useState } from 'react';
import { AppItem, AppLabel, AppText } from '..';
import { prettyTitle } from '../../util';
import { inputStatusColorMap } from '../AppFormInput';
import AppInput from '../AppInput';

/**
 * Component for input that displays validation errors
 */
const AppFormInteger = props => {
  const {
    property,
    instanceRef,
    onChange,
    propertyInfo
  } = props;
  const [errors, setErrors] = useState([]);
  const [inputStatus, setInputStatus] = useState("empty");
  const [value, setValue] = useState(instanceRef.current && instanceRef.current[property] || null);
  const propertyFormattedName = prettyTitle(propertyInfo.title || property);
  useEffect(() => {
    if (value === null) {
      return;
    }

    const formValue = value === "" ? "0" : value;
    onChange(property, formValue ? parseInt(formValue) : 0).then(([validationStatus, validationErrors]) => {
      setInputStatus(validationStatus);
      setErrors(validationErrors || []);
    });
  }, [onChange, property, value]);
  const statusColor = inputStatusColorMap[inputStatus];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppItem, {
    color: "clear",
    lines: "none"
  }, /*#__PURE__*/React.createElement(AppLabel, {
    position: "stacked",
    color: statusColor
  }, propertyFormattedName), /*#__PURE__*/React.createElement(AppInput, {
    type: "number",
    value: value,
    placeholder: propertyFormattedName,
    onInputChange: val => {
      setValue(val);
    }
  })), errors && errors.length > 0 && /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppLabel, {
    position: "stacked",
    color: "danger"
  }, errors.map((error, i) => /*#__PURE__*/React.createElement(AppText, {
    key: i
  }, error)))));
};

export default AppFormInteger;