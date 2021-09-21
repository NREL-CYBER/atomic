import produce from "immer";
import { addOutline } from 'ionicons/icons';
import React, { Suspense, useCallback, useState } from 'react';
import { AppBackButton, AppButton, AppButtons, AppChip, AppContent, AppFormComposer, AppIcon, AppItem, AppLabel, AppLoadingCard, AppModal, AppRow, AppText, AppToolbar } from '.';
import { remove } from '../util';
import prettyTitle from '../util/prettyTitle';
import { findShortestValue } from "./AppFormArrayInput";
import { inputStatusColorMap } from "./AppFormInput";
import { findSubSchema } from './forms/AppForm';

/**
 * Find a way to keep this DRY there is too much overlap with standard array editor
 * Add a parameter and provide this functionality there when we actually need this component
 */
const AppFormAnyOfArrayInput = props => {
  const {
    property,
    instanceRef,
    onChange,
    propertyInfo,
    customComponentMap,
    hiddenFields,
    lockedFields,
    showFields,
    objectSchema,
    rootSchema
  } = props;
  const existing_data = instanceRef.current[property] ? instanceRef.current[property] : [];
  const [errors, setErrors] = useState(undefined);
  const [inputStatus, setInputStatus] = useState(existing_data.length === 0 ? "empty" : "valid");
  const [status, setStatus] = useState("idle");
  const [value, setValue] = useState(existing_data);
  const [selectedType, setSelectedType] = useState();
  const [data, setData] = useState({});
  const propertyFormattedName = prettyTitle(propertyInfo.title || property);
  const inputStatusColor = inputStatusColorMap[inputStatus];

  const beginInsertItem = (val = {}) => {
    if (typeof value === "undefined") {
      setValue([]);
    }

    ;
    setData(val);
    setStatus("inserting");
  };

  const removeAndbeginInsert = val => {
    const valueRemoved = remove(item => item === val, value);
    setValue(valueRemoved);
    beginInsertItem(val);
  };

  const onSubmitItem = useCallback(async item => {
    const newValue = produce(value, draftValue => {
      draftValue.push(item);
    });
    const [validationStatus, errors] = await onChange(property, newValue);
    setStatus("idle");
    setValue(newValue);
    setInputStatus(validationStatus);
    setErrors(errors);
  }, [onChange, property, value]);
  const onBackPressed = useCallback(() => {
    setStatus("idle");
    onSubmitItem(data);
  }, [data, onSubmitItem]);
  return /*#__PURE__*/React.createElement(AppRow, null, /*#__PURE__*/React.createElement(AppToolbar, {
    color: "clear"
  }, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "start"
  }, /*#__PURE__*/React.createElement(AppButton, {
    fill: "clear",
    onClick: () => {
      setStatus("selecting");
    },
    color: inputStatusColor
  }, propertyFormattedName)), /*#__PURE__*/React.createElement(AppButtons, null, status === "idle" && value && value.map((val, i) => {
    return /*#__PURE__*/React.createElement(AppChip, {
      key: i,
      onClick: () => removeAndbeginInsert(val)
    }, /*#__PURE__*/React.createElement(React.Fragment, null, typeof val === "string" && val, typeof val === "object" && findShortestValue(val)));
  })), status === "selecting" && /*#__PURE__*/React.createElement(React.Fragment, null, propertyInfo.items.anyOf.map(x => /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => {
      setSelectedType(x);
      beginInsertItem();
    },
    color: "primary"
  }, x.title || (x.$ref || "").split("/").pop() || x.$id))), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, status === "idle" && /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => {
      setStatus("selecting");
    },
    fill: "solid",
    color: "primary"
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: addOutline
  }))), /*#__PURE__*/React.createElement("div", {
    hidden: !(status === "inserting")
  }, /*#__PURE__*/React.createElement(AppModal, {
    isOpen: status === "inserting",
    onDismiss: () => setStatus("idle")
  }, /*#__PURE__*/React.createElement(Suspense, {
    fallback: /*#__PURE__*/React.createElement(AppLoadingCard, null)
  }, /*#__PURE__*/React.createElement(AppContent, null, selectedType && /*#__PURE__*/React.createElement(AppFormComposer, {
    showFields: showFields,
    hiddenFields: hiddenFields,
    lockedFields: lockedFields,
    customComponentMap: customComponentMap,
    rootSchema: rootSchema,
    objectSchema: findSubSchema(rootSchema, objectSchema, selectedType),
    data: { ...data
    },
    onSubmit: onSubmitItem
  }, /*#__PURE__*/React.createElement(AppBackButton, {
    onClick: onBackPressed
  }))))))), errors && errors.length > 0 && /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppLabel, {
    position: "stacked",
    color: "danger"
  }, errors.map(error => /*#__PURE__*/React.createElement(AppText, null, error)))));
};

export default AppFormAnyOfArrayInput;