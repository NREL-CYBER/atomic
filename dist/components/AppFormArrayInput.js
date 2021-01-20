import { addOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { AppBackButton, AppButton, AppButtons, AppChip, AppContent, AppIcon, AppItem, AppLabel, AppModal, AppRow, AppText, AppToolbar } from '.';
import titleCase from '../util/titleCase';
import FormComposer from './forms/AppFormComposer';
const inputStatusColorMap = {
  empty: "dark",
  valid: "favorite",
  invalid: "danger"
};
/**
 * Component for input that displays validation errors
 */

const AppFormArrayInput = props => {
  const {
    property,
    instanceRef,
    validator,
    propertyInfo,
    onChange
  } = props;
  const [errors, setErrors] = useState(undefined);
  const [inputStatus, setInputStatus] = useState("empty");
  const [isInsertingItem, setIsInsertingItem] = useState(false);
  const [value, setValue] = useState(instanceRef.current && instanceRef.current[property]);
  const propertyFormattedName = titleCase(property).replace("-", " ");
  const inputStatusColor = inputStatusColorMap[inputStatus];
  return /*#__PURE__*/React.createElement(AppRow, null, /*#__PURE__*/React.createElement(AppToolbar, null, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "start"
  }, /*#__PURE__*/React.createElement(AppLabel, {
    color: inputStatusColor
  }, propertyFormattedName)), /*#__PURE__*/React.createElement(AppButtons, null, value && value.map((val, i) => {
    return /*#__PURE__*/React.createElement(AppChip, {
      key: i
    }, val.hasOwnProperty("id") && val["id"], val.hasOwnProperty("type") && val["type"], val.hasOwnProperty("name") && val["name"], val.hasOwnProperty("value") && val["value"], val.hasOwnProperty("text") && val["text"]);
  })), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => {
      if (typeof value === "undefined") {
        setValue([]);
      }

      ;
      setIsInsertingItem(true);
    },
    fill: "outline",
    color: "primary"
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: addOutline
  }))), /*#__PURE__*/React.createElement(AppModal, {
    isOpen: isInsertingItem,
    onDismiss: () => setIsInsertingItem(false)
  }, /*#__PURE__*/React.createElement(AppContent, null, isInsertingItem && /*#__PURE__*/React.createElement(FormComposer, {
    validator: validator.makeReferenceValidator(propertyInfo),
    data: {},
    onSubmit: item => {
      const newValue = [...value, item];
      setValue(newValue);
      setIsInsertingItem(false);
      const [validationStatus, errors] = onChange(property, newValue);
      setInputStatus(validationStatus);
      setErrors(errors);
    }
  }, /*#__PURE__*/React.createElement(AppBackButton, {
    onClick: () => setIsInsertingItem(false)
  }))))), errors && errors.length > 0 && /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppLabel, {
    position: "stacked",
    color: "danger"
  }, errors.map(error => /*#__PURE__*/React.createElement(AppText, null, error)))));
};

export default AppFormArrayInput;