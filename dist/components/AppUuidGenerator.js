import React, { useEffect, useState } from 'react';
import titleCase from '../util/titleCase';
import { v4 as uuidv4 } from "uuid";
import AppButtons from './AppButtons';
import AppChip from './AppChip';
import AppCol from './AppCol';
import AppItem from './AppItem';
import AppLabel from './AppLabel';
import AppText from './AppText';
const inputStatusColorMap = {
  empty: "dark",
  valid: "favorite",
  invalid: "danger"
};
/**
 * Component for input that displays validation errors
 */

const AppUuidGenerator = props => {
  const {
    instanceRef,
    validator
  } = props;
  const property = "uuid";

  if (instanceRef.current.uuid === undefined) {
    instanceRef.current.uuid = uuidv4();
  }

  const [errors, setErrors] = useState([]);
  const [inputStatus, setInputStatus] = useState("empty");
  const [value] = useState(instanceRef.current && instanceRef.current[property] || "");
  const propertyFormattedName = titleCase(property);
  useEffect(() => {
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
  }, [instanceRef, validator, value]);
  const inputStatusColor = inputStatusColorMap[inputStatus];
  return /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "start"
  }, /*#__PURE__*/React.createElement(AppLabel, {
    position: "stacked",
    color: inputStatusColor
  }, /*#__PURE__*/React.createElement(AppCol, null, propertyFormattedName), /*#__PURE__*/React.createElement(AppCol, null, /*#__PURE__*/React.createElement(AppChip, {
    color: "medium"
  }, value)))), /*#__PURE__*/React.createElement(AppLabel, {
    position: "stacked",
    color: "danger"
  }, errors && errors.map(error => /*#__PURE__*/React.createElement(AppText, null, error.message))));
};

export default AppUuidGenerator;