import { addOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { AppBackButton, AppButton, AppButtons, AppChip, AppContent, AppIcon, AppItem, AppLabel, AppModal, AppRow, AppText, AppToolbar } from '.';
import { remove } from '../util';
import titleCase from '../util/titleCase';
import FormComposer from './forms/AppForm';
import produce from "immer";
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
    onChange
  } = props;
  const [errors, setErrors] = useState(undefined);
  const [inputStatus, setInputStatus] = useState("empty");
  const [isInsertingItem, setIsInsertingItem] = useState(false);
  const [value, setValue] = useState(instanceRef.current[property] ? instanceRef.current[property] : []);
  const [data, setData] = useState({});
  const [undoCache, setUndoCache] = useState();
  const propertyFormattedName = titleCase(property).split("_").join(" ");
  const inputStatusColor = inputStatusColorMap[inputStatus];

  const beginInsertItem = (val = {}) => {
    if (typeof value === "undefined") {
      setValue([]);
    }

    ;
    setData(val);
    setUndoCache(val);
    setIsInsertingItem(true);
  };

  return /*#__PURE__*/React.createElement(AppRow, null, /*#__PURE__*/React.createElement(AppToolbar, null, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "start"
  }, /*#__PURE__*/React.createElement(AppButton, {
    fill: "clear",
    onClick: () => {
      beginInsertItem();
    },
    color: inputStatusColor
  }, propertyFormattedName)), /*#__PURE__*/React.createElement(AppButtons, null, value && value.map((val, i) => {
    return /*#__PURE__*/React.createElement(AppChip, {
      key: i,
      onClick: () => {
        const valueRemoved = remove(item => item === val, value);
        setValue(valueRemoved);
        beginInsertItem(val);
      }
    }, typeof val === "string" && val, typeof val === "object" && Object.values(val).sort((a, b) => String(a).length - String(b).length)[0]);
  })), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => {
      beginInsertItem();
    },
    fill: "outline",
    color: "primary"
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: addOutline
  }))), /*#__PURE__*/React.createElement(AppModal, {
    isOpen: isInsertingItem,
    onDismiss: () => setIsInsertingItem(false)
  }, /*#__PURE__*/React.createElement(AppContent, null, isInsertingItem && /*#__PURE__*/React.createElement(FormComposer, {
    validator: validator,
    data: { ...data
    },
    onSubmit: item => {
      const newValue = produce(value, draftValue => {
        draftValue.push(item);
      });
      const [validationStatus, errors] = onChange(property, newValue);
      setIsInsertingItem(false);
      setValue(newValue);
      setInputStatus(validationStatus);
      setErrors(errors);
    }
  }, /*#__PURE__*/React.createElement(AppBackButton, {
    onClick: () => {
      if (validator.validate(undoCache)) {
        const newValue = [...value, undoCache];
        setValue(newValue);
      }

      setIsInsertingItem(false);
    }
  }))))), errors && errors.length > 0 && /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppLabel, {
    position: "stacked",
    color: "danger"
  }, errors.map(error => /*#__PURE__*/React.createElement(AppText, null, error)))));
};

export default AppFormArrayInput;