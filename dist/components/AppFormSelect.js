import React, { useCallback, useEffect, useState } from 'react';
import { prettyTitle } from '../util';
import titleCase from '../util/titleCase';
import { inputStatusColorMap } from './AppFormInput';
import AppItem from './AppItem';
import AppLabel from './AppLabel';
import AppSelect from './AppSelect';
import AppSelectOption from './AppSelectOption';
import AppText from './AppText';

/**
 * Component for input that displays validation errors
 */
const AppFormSelect = props => {
  const {
    propertyInfo,
    instanceRef,
    onChange,
    property
  } = props;
  const [errors, setErrors] = useState(undefined);
  const [inputStatus, setInputStatus] = useState("empty");
  let instanceValue = instanceRef.current && instanceRef.current[property];

  if (typeof instanceValue === "undefined") {
    instanceRef.current[property] = "";
  }

  const [value, setValue] = useState(instanceValue);
  const propertyFormattedName = prettyTitle(propertyInfo.title ? propertyInfo.title : property);
  const inputStatusColor = inputStatusColorMap[inputStatus];
  const updateSelection = useCallback(val => {
    if (val === "" || typeof val === "undefined" || val === null) {
      setInputStatus("empty");
      return;
    }

    const [validationStatus, validationErrors] = onChange(property, val);
    setInputStatus(validationStatus);
    setErrors(validationErrors);
    setValue(value);
  }, [onChange, property, value]);
  useEffect(() => {
    updateSelection(value);
  }, [updateSelection, value]);
  return /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppLabel, {
    position: "stacked",
    color: inputStatusColor
  }, propertyFormattedName), /*#__PURE__*/React.createElement(AppSelect, {
    interface: "popover",
    value: value,
    placeholder: propertyFormattedName,
    onSelectionChange: selection => {
      setValue(selection);
    }
  }, propertyInfo.enum.map(enumValue => /*#__PURE__*/React.createElement(AppSelectOption, {
    key: enumValue,
    value: enumValue,
    children: titleCase(enumValue)
  }))), /*#__PURE__*/React.createElement(AppLabel, {
    position: "stacked",
    color: "danger"
  }, errors && errors.map(error => /*#__PURE__*/React.createElement(AppText, null, error))));
};

export default AppFormSelect;