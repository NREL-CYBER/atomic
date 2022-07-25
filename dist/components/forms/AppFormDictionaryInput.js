import produce from "immer";
import { addOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { v4 } from 'uuid';
import { AppBackButton, AppButton, AppButtons, AppContent, AppForm, AppIcon, AppItem, AppLabel, AppModal, AppRow, AppText, AppToolbar } from '..';
import { prettyTitle } from "../../util";
import { inputStatusColorMap } from "../AppFormInput";
import { VisualizeValue } from "../AppJsonDisplay";
import { findSubSchema } from "./AppForm";
/**
 * Component for input that displays validation errors
 */

const AppFormDictionaryInput = props => {
  //destructure props
  const {
    property,
    instanceRef,
    objectSchema,
    onChange,
    propertyInfo,
    customInputMap,
    hiddenFields,
    customRenderMap,
    lockedFields,
    showFields,
    rootSchema
  } = props;
  const {
    title
  } = propertyInfo; //local state

  const [errors, setErrors] = useState(undefined);
  const [inputStatus, setInputStatus] = useState("empty");
  const [isInsertingItem, setIsInsertingItem] = useState(false);
  const [value, setValue] = useState(instanceRef.current[property] ? instanceRef.current[property] : {});
  const [data, setData] = useState({});
  const [activeIndex, setActiveIndex] = useState(undefined); //local queries

  const propertyFormattedName = prettyTitle(title || property);
  const inputStatusColor = inputStatusColorMap[inputStatus]; //local events

  const beginInsertItem = (index = v4(), val = {}) => {
    setActiveIndex(index);

    if (typeof value === "undefined") {
      setValue({});
    }

    ;
    setData(val);
    setIsInsertingItem(true);
  };

  const onSubmitValue = item => {
    const newValue = produce(value, draftValue => {
      draftValue[activeIndex ? activeIndex : v4()] = item;
    });
    onChange(property, newValue).then(([validationStatus, errors]) => {
      setIsInsertingItem(false);
      setValue(newValue);
      setInputStatus(validationStatus);
      setErrors(errors);
    });
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
  }, propertyFormattedName)), /*#__PURE__*/React.createElement(AppButtons, null, value && Object.entries(value).map(([prop, val]) => {
    return /*#__PURE__*/React.createElement(VisualizeValue, {
      propertyInfo: objectSchema.properties ? objectSchema.properties[prop] : propertyInfo,
      customRenderMap: customRenderMap,
      value: val
    });
  })), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => {
      beginInsertItem(v4());
    },
    fill: "solid",
    color: "primary"
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: addOutline
  }))), /*#__PURE__*/React.createElement(AppModal, {
    isOpen: isInsertingItem,
    onDismiss: () => setIsInsertingItem(false)
  }, /*#__PURE__*/React.createElement(AppContent, null, isInsertingItem && /*#__PURE__*/React.createElement(AppForm, {
    customInputMap: customInputMap,
    objectSchema: findSubSchema(rootSchema, objectSchema, propertyInfo),
    rootSchema: rootSchema,
    data: { ...data
    },
    showFields: showFields,
    hiddenFields: hiddenFields,
    lockedFields: lockedFields,
    onSubmit: onSubmitValue
  }, /*#__PURE__*/React.createElement(AppBackButton, {
    onClick: () => {
      setIsInsertingItem(false);
    }
  }))))), errors && errors.length > 0 && /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppLabel, {
    position: "stacked",
    color: "danger"
  }, errors.map(error => /*#__PURE__*/React.createElement(AppText, null, error)))));
};

export default AppFormDictionaryInput;