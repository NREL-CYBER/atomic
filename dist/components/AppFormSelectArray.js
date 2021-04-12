import React, { useState, useCallback } from 'react';
import { AppSelectArray } from '.';
import { prettyTitle } from '../util';
import AppItem from './AppItem';
import AppLabel from './AppLabel';
import AppSelectOption from './AppSelectOption';
import AppText from './AppText';
const inputStatusColorMap = {
  empty: "dark",
  valid: "favorite",
  invalid: "danger"
};
/**
 * Component for input that displays validation errors
 */

const AppFormSelectArray = props => {
  const {
    propertyInfo,
    instanceRef,
    onChange,
    property,
    multiple
  } = props;
  const [errors, setErrors] = useState(undefined);
  const [inputStatus, setInputStatus] = useState("empty");
  let instanceValue = instanceRef.current && instanceRef.current[property];

  if (typeof instanceValue === "undefined") {
    instanceRef.current[property] = [];
  }

  const [value, setValue] = useState(instanceRef.current[property]);
  const propertyFormattedName = prettyTitle(propertyInfo.title ? propertyInfo.title : property);
  const inputStatusColor = inputStatusColorMap[inputStatus];
  const updateSelection = useCallback(val => {
    setValue(val);

    if (typeof val === "undefined" || val === null) {
      setInputStatus("empty");
      return;
    }

    const [validationStatus, validationErrors] = onChange(property, val);
    setInputStatus(validationStatus);
    setErrors(validationErrors);
  }, [onChange, property]);
  return /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppLabel, {
    position: "stacked",
    color: inputStatusColor
  }, propertyFormattedName), /*#__PURE__*/React.createElement(AppSelectArray, {
    multiple: multiple,
    value: value,
    placeholder: propertyFormattedName,
    onSelectionChange: selection => {
      updateSelection(selection);
    }
  }, propertyInfo.enum.map(enumValue => /*#__PURE__*/React.createElement(AppSelectOption, {
    key: enumValue,
    value: enumValue,
    children: prettyTitle(enumValue)
  }))), /*#__PURE__*/React.createElement(AppLabel, {
    position: "stacked",
    color: "danger"
  }, errors && errors.map(error => /*#__PURE__*/React.createElement(AppText, null, error))));
};

export default AppFormSelectArray;