import React, { useEffect, useState } from 'react';
import { prettyTitle } from '../util';
import AppInput from './AppInput';
import AppItem from './AppItem';
import AppLabel from './AppLabel';
import AppText from './AppText';
import AppTextArea from './AppTextArea';
const inputStatusColorMap = {
  empty: "medium",
  valid: "favorite",
  invalid: "danger"
};

/**
 * Component for input that displays validation errors
 */
const AppFormInput = props => {
  const {
    property,
    instanceRef,
    input,
    onChange,
    propertyInfo
  } = props;
  const [errors, setErrors] = useState([]);
  const [inputStatus, setInputStatus] = useState("empty");
  const instance = instanceRef.current && instanceRef.current[property];
  const [value, setValue] = useState(input !== "array" ? typeof instance !== "undefined" ? instance.join("\n") : [] : null);
  const propertyFormattedName = prettyTitle(propertyInfo.title ? propertyInfo.title : property || "");

  const calculateType = () => {
    const accepted_formats = ["email", "date", "time"];
    const accepted_format_index = accepted_formats.indexOf(propertyInfo.format || "");

    if (accepted_format_index !== -1) {
      return accepted_formats[accepted_format_index];
    } else if (propertyInfo.writeOnly) {
      return "password";
    } else {
      return undefined;
    }
  };

  useEffect(() => {
    if (value === null) {
      return;
    }

    const formValue = value === "" ? undefined : value;
    const propertyValue = input === "array" ? (formValue || "").split("\n") : formValue;
    const [validationStatus, validationErrors] = onChange(property, propertyValue);
    setInputStatus(validationStatus);
    setErrors(validationErrors || []);
  }, [input, onChange, property, value]);
  const statusColor = inputStatusColorMap[inputStatus];
  const inputMode = calculateType();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppItem, {
    color: "clear",
    lines: "none"
  }, /*#__PURE__*/React.createElement(AppLabel, {
    position: "stacked",
    color: statusColor
  }, propertyFormattedName), input === "line" || inputMode === "email" || inputMode === "password" || inputMode === "time" || inputMode === "date" ? /*#__PURE__*/React.createElement(AppInput, {
    color: "dark",
    type: inputMode,
    value: value,
    placeholder: propertyFormattedName,
    onInputChange: val => {
      setValue(val);
    }
  }) : /*#__PURE__*/React.createElement(AppTextArea, {
    color: "dark",
    inputMode: inputMode,
    value: value,
    onTextChange: val => {
      console.log(val);
      setValue(val);
    }
  })), errors && errors.length > 0 && /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppLabel, {
    position: "stacked",
    color: "danger"
  }, errors.map((error, i) => /*#__PURE__*/React.createElement(AppText, {
    key: i
  }, error)))));
};

export default AppFormInput;