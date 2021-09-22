import { AppCol } from 'atomic';
import React, { useCallback, useEffect, useState } from 'react';
import { isUndefined, prettyTitle } from '../util';
import titleCase from '../util/titleCase';
import { inputStatusColorMap } from './AppFormInput';
import AppItem from './AppItem';
import AppSelect from './AppSelect';
import AppSelectOption from './AppSelectOption';
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
    required
  } = props;
  const [errors, setErrors] = useState(undefined);
  const [inputStatus, setInputStatus] = useState("empty");
  let instanceValue = instanceRef.current && instanceRef.current[property];

  if (isUndefined(instanceValue)) {
    instanceRef.current[property] = "";
  }

  const [value, setValue] = useState(instanceValue);
  const propertyFormattedName = prettyTitle(propertyInfo.title ? propertyInfo.title : property);
  const statusColor = inputStatusColorMap[inputStatus];
  const updateSelection = useCallback(val => {
    if (val === "" || typeof val === "undefined" || val === null) {
      setInputStatus("empty");
      return;
    }

    onChange(property, val).then(([validationStatus, validationErrors]) => {
      setInputStatus(validationStatus);
      setErrors(validationErrors);
      setValue(value);
    });
  }, [onChange, property, value]);
  useEffect(() => {
    updateSelection(value);
  }, [updateSelection, value]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppFormLabel, {
    required: required,
    name: propertyFormattedName,
    color: statusColor
  }), /*#__PURE__*/React.createElement(AppCol, null, /*#__PURE__*/React.createElement(AppSelect, {
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
  }))))), /*#__PURE__*/React.createElement(AppFormErrorsItem, {
    errors: errors
  }));
};

export default AppFormSelect;