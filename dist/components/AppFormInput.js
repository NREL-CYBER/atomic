import React, { useEffect, useState } from 'react';
import titleCase from '../util/titleCase';
import AppInput from './AppInput';
import AppItem from './AppItem';
import AppLabel from './AppLabel';
import AppText from './AppText';
import AppTextArea from './AppTextArea';
const inputStatusColorMap = {
  empty: "dark",
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
    validator,
    input,
    onValid
  } = props;
  const [errors, setErrors] = useState([]);
  const [inputStatus, setInputStatus] = useState("empty");
  const [value, setValue] = useState(instanceRef.current && instanceRef.current[property] || "");
  const propertyFormattedName = titleCase(property);
  useEffect(() => {
    if (value.length === 0) {
      return;
    }

    const change = {};
    change[property] = value;
    instanceRef.current = { ...instanceRef.current,
      ...change
    };
    validator.validate(instanceRef.current);
    const allErrors = validator.validate.errors || [];
    const propertyErrors = allErrors.filter(error => error.message && error.message.includes(property));

    if (propertyErrors.length === 0 && value) {
      setInputStatus("valid");
    } else if (value) {
      setInputStatus("invalid");
    } else {
      setInputStatus("empty");
    }

    setErrors(propertyErrors);
  }, [instanceRef, property, validator, value]);
  const inputStatusColor = inputStatusColorMap[inputStatus];

  const handleLoseFocus = () => {
    console.log("lose focus");
    inputStatus === "valid" && onValid(property);
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppLabel, {
    position: "stacked",
    color: inputStatusColor
  }, propertyFormattedName), input === "line" ? /*#__PURE__*/React.createElement(AppInput, {
    onLoseFocus: handleLoseFocus,
    value: value,
    placeholder: propertyFormattedName,
    onInputChange: val => {
      setValue(val);
    }
  }) : /*#__PURE__*/React.createElement(AppTextArea, {
    onLoseFocus: handleLoseFocus,
    value: value,
    onTextChange: val => {
      setValue(val);
    }
  })), errors && errors.length > 0 && /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppLabel, {
    position: "stacked",
    color: "danger"
  }, errors.map(error => /*#__PURE__*/React.createElement(AppText, null, error.message)))));
};

export default AppFormInput;