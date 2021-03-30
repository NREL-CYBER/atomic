import React, { useState } from 'react';
import { prettyTitle } from '../util';
import titleCase from '../util/titleCase';
import AppItem from './AppItem';
import AppLabel from './AppLabel';
import AppSelectOption from './AppSelectOption';
import AppSelectSingle from './AppSelectSingle';
import AppText from './AppText';
const inputStatusColorMap = {
  empty: "dark",
  valid: "favorite",
  invalid: "danger"
};
/**
 * Component for input that displays validation errors
 */

const AppFormSelectSingle = props => {
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
  return /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppLabel, {
    position: "stacked",
    color: inputStatusColor
  }, propertyFormattedName), /*#__PURE__*/React.createElement(AppSelectSingle, {
    interface: "popover",
    value: value,
    placeholder: propertyFormattedName,
    onSelectionChange: val => {
      if (val === "") {
        return;
      }

      const [validationStatus, validationErrors] = onChange(property, val);
      setInputStatus(validationStatus);
      setErrors(validationErrors);
      setValue(value);
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

export default AppFormSelectSingle;