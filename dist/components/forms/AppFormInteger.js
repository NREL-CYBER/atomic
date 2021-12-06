/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { AppItem } from '..';
import { prettyTitle } from '../../util';
import { inputStatusColorMap } from '../AppFormInput';
import AppInput from '../AppInput';
import { AppFormErrorsItem } from './AppFormErrorsItem';
import { AppFormLabel } from './AppFormLabel';

/**
 * Component for input that displays validation errors
 */
const AppFormInteger = props => {
  const {
    property,
    instanceRef,
    onChange,
    propertyInfo,
    required
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
      console.log(validationStatus);
      console.log(validationErrors);
      setInputStatus(validationStatus);
      setErrors(validationErrors || []);
    });
  }, [onChange, property, value]);
  const statusColor = inputStatusColorMap[inputStatus];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppItem, {
    color: "clear",
    lines: "none"
  }, /*#__PURE__*/React.createElement(AppFormLabel, {
    required: required,
    name: propertyFormattedName,
    color: statusColor
  }), useMemo(() => /*#__PURE__*/React.createElement(AppInput, {
    min: propertyInfo === null || propertyInfo === void 0 ? void 0 : propertyInfo.minumum,
    max: propertyInfo === null || propertyInfo === void 0 ? void 0 : propertyInfo.maximum,
    type: "number",
    value: value,
    placeholder: propertyFormattedName,
    onInputChange: val => {
      setValue(val);
    }
  }), [])), /*#__PURE__*/React.createElement(AppFormErrorsItem, {
    errors: errors
  }));
};

export default AppFormInteger;