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
    input,
    onChange
  } = props;
  const [errors, setErrors] = useState([]);
  const [inputStatus, setInputStatus] = useState("empty");
  const [value, setValue] = useState(instanceRef.current && instanceRef.current[property] || null);
  const propertyFormattedName = titleCase(property);
  useEffect(() => {
    if (value === null) {
      return;
    }

    const formValue = value === "" ? undefined : value;
    const [validationStatus, validationErrors] = onChange(property, formValue);
    console.log(validationStatus);
    setInputStatus(validationStatus);
    setErrors(validationErrors || []);
  }, [onChange, property, value]);
  const statusColor = inputStatusColorMap[inputStatus];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppItem, {
    lines: "none"
  }, /*#__PURE__*/React.createElement(AppLabel, {
    position: "stacked",
    color: statusColor
  }, propertyFormattedName), input === "line" ? /*#__PURE__*/React.createElement(AppInput, {
    value: value,
    placeholder: propertyFormattedName,
    onInputChange: val => {
      setValue(val);
    }
  }) : /*#__PURE__*/React.createElement(AppTextArea, {
    value: value,
    onTextChange: val => {
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