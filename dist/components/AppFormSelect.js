import { AppCol } from 'atomic';
import { isArray } from 'lodash';
import React, { useState } from 'react';
import { prettyTitle } from '../util';
import { inputStatusColorMap } from './AppFormInput';
import AppItem from './AppItem';
import AppSelectButtons from './AppSelectButtons';
import { AppFormErrorsItem } from './forms/AppFormErrorsItem';
import { AppFormLabel } from './forms/AppFormLabel';

/**
 * Component for input that displays validation errors
 */
const AppFormSelect = props => {
  const {
    propertyInfo,
    instanceRef,
    onChange,
    property,
    required,
    context
  } = props;
  const [errors, setErrors] = useState(undefined);
  const [inputStatus, setInputStatus] = useState(instanceRef.current && typeof instanceRef.current[property] === "undefined" ? "empty" : "valid");
  let instanceValue = instanceRef.current && instanceRef.current[property];
  const [value, setValue] = useState(instanceValue);
  const propertyFormattedName = prettyTitle(propertyInfo.title ? propertyInfo.title : property);
  const statusColor = inputStatusColorMap[inputStatus];
  let options = propertyInfo.enum;

  if (context && isArray(context) && context.length > 0 && context[0] === "string") {
    options = options.filter(x => !context.includes(x));
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppFormLabel, {
    required: required,
    name: propertyFormattedName,
    color: statusColor
  }), /*#__PURE__*/React.createElement(AppCol, null, /*#__PURE__*/React.createElement(AppSelectButtons, {
    display: "vertical",
    segment: true,
    selected: [value],
    onSelectionChange: ([val]) => {
      setValue(val);
      onChange(property, val).then(([validationStatus, validationErrors]) => {
        setInputStatus(validationStatus);
        setErrors(validationErrors);
      });
    },
    buttons: options.map(enumValue => ({
      fill: "clear",
      color: value === enumValue ? "primary" : "medium",
      value: enumValue,
      text: prettyTitle(enumValue)
    }))
  }))), /*#__PURE__*/React.createElement(AppFormErrorsItem, {
    errors: errors
  }));
};

export default AppFormSelect;