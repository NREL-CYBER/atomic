import { isArray } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { prettyTitle } from '../util';
import AppInput from './AppInput';
import AppItem from './AppItem';
import AppTextArea from './AppTextArea';
import { AppFormErrorsItem } from './forms/AppFormErrorsItem';
import { AppFormLabel } from './forms/AppFormLabel';
export const inputStatusColorMap = {
  empty: "medium",
  valid: "favorite",
  unknown: 'tertiary',
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
    propertyInfo,
    required,
    context
  } = props;
  const {
    description
  } = propertyInfo;
  const [errors, setErrors] = useState();
  const [validating, setValidating] = useState();
  const [inputStatus, setInputStatus] = useState("empty");
  const instance = instanceRef.current && instanceRef.current[property];
  const instanceType = typeof instance; // This component supports arrays as input for fields that are simply arrays of strings for multi-line content
  // If this is confusing, learn more about ternary operators:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
  // This is a chained Ternary:

  const [value, setValue] = useState(instanceType === "undefined" ? undefined : input !== "array" ? instance : typeof instance === "object" ? instance.join("\n") : instance);
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
    if (value === validating) {
      return;
    }

    if (value === null || value === "" || typeof value === "undefined") {
      setInputStatus("empty");
      setErrors([]);
      return;
    }

    if (isArray(context) && context.includes(validating)) {
      setErrors([value + " already exists"]);
      setInputStatus("invalid");
      return;
    }

    const formValue = value === "" ? undefined : value;
    const propertyValue = input === "array" ? (formValue || "").split("\n") : formValue;
    setValidating(value);
    onChange(property, propertyValue).then(([validationStatus, errors]) => {
      setInputStatus(validationStatus);
      setErrors(errors);
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, onChange, property, value]);
  const statusColor = inputStatusColorMap[inputStatus];
  const inputMode = calculateType();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppFormLabel, {
    name: propertyFormattedName,
    color: statusColor,
    required: required
  }), useMemo(() => /*#__PURE__*/React.createElement(React.Fragment, null, property === "name" || property === "title" || input === "line" || inputMode === "email" || inputMode === "password" || inputMode === "time" || inputMode === "date" ? /*#__PURE__*/React.createElement(AppInput, {
    color: "dark",
    type: inputMode,
    value: value,
    placeholder: description || "",
    onInputChange: val => {
      setValue(val);
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(AppTextArea, {
    rows: property === "description" ? 5 : 3,
    placeholder: description,
    color: "dark",
    inputMode: inputMode || "text",
    value: value,
    onTextChange: val => {
      setValue(val); // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }))), [input])), /*#__PURE__*/React.createElement(AppFormErrorsItem, {
    errors: errors
  }));
};

export default AppFormInput;