import produce from "immer";
import { addOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { AppBackButton, AppButton, AppButtons, AppChip, AppContent, AppIcon, AppItem, AppLabel, AppModal, AppRow, AppText, AppToolbar } from '.';
import { remove } from '../util';
import prettyTitle from '../util/prettyTitle';
import { inputStatusColorMap } from "./AppFormInput";
import AppForm from './forms/AppForm';
export const findShortestValue = val => {
  /**This looks like vooodooo, but it is just displaying the value 
                   * that is the shortest, which is usually the title || name */
  const standard_values = ["name", "title"];
  Object.keys(val).forEach(key => {
    standard_values.forEach(visible_key => {
      if (key === visible_key) return val[key];
    });
  });
  return String(Object.values(val).sort((a, b) => String(a).length - String(b).length).filter(x => x.length > 2)[0]);
};
/**
 * Component for input that displays validation errors
 */

const AppFormArrayInput = props => {
  const {
    property,
    instanceRef,
    validator,
    onChange,
    customTitleFunction,
    propertyInfo,
    customComponentMap,
    hiddenFields,
    lockedFields,
    showFields
  } = props;
  const [errors, setErrors] = useState(undefined);
  const [inputStatus, setInputStatus] = useState("empty");
  const [isInsertingItem, setIsInsertingItem] = useState(false);
  const [value, setValue] = useState(instanceRef.current[property] ? instanceRef.current[property] : []);
  const [data, setData] = useState({});
  const [undoCache, setUndoCache] = useState();
  const propertyFormattedName = prettyTitle(propertyInfo.title || property);
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

  const removeAndbeginInsert = val => {
    const valueRemoved = remove(item => item === val, value);
    setValue(valueRemoved);
    beginInsertItem(val);
  };

  const onSubmitItem = item => {
    const newValue = produce(value, draftValue => {
      draftValue.push(item);
    });
    const [validationStatus, errors] = onChange(property, newValue);
    setIsInsertingItem(false);
    setValue(newValue);
    setInputStatus(validationStatus);
    setErrors(errors);
  };

  const onBackPressed = () => {
    if (validator.validate(undoCache)) {
      const newValue = [...value, undoCache];
      setValue(newValue);
    }

    setIsInsertingItem(false);
  };

  return /*#__PURE__*/React.createElement(AppRow, null, /*#__PURE__*/React.createElement(AppToolbar, {
    color: "clear"
  }, /*#__PURE__*/React.createElement(AppButtons, {
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
      onClick: () => removeAndbeginInsert(val)
    }, customTitleFunction ? customTitleFunction(val) : /*#__PURE__*/React.createElement(React.Fragment, null, typeof val === "string" && val, typeof val === "object" && findShortestValue(val)));
  })), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => {
      beginInsertItem();
    },
    fill: "solid",
    color: "primary"
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: addOutline
  }))), isInsertingItem && /*#__PURE__*/React.createElement(AppModal, {
    isOpen: true,
    onDismiss: () => setIsInsertingItem(false)
  }, /*#__PURE__*/React.createElement(AppContent, null, /*#__PURE__*/React.createElement(AppForm, {
    showFields: showFields,
    hiddenFields: hiddenFields,
    lockedFields: lockedFields,
    customComponentMap: customComponentMap,
    validator: validator,
    data: { ...data
    },
    onSubmit: onSubmitItem
  }, /*#__PURE__*/React.createElement(AppBackButton, {
    onClick: onBackPressed
  }))))), errors && errors.length > 0 && /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppLabel, {
    position: "stacked",
    color: "danger"
  }, errors.map(error => /*#__PURE__*/React.createElement(AppText, null, error)))));
};

export default AppFormArrayInput;