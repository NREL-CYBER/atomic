/* eslint-disable no-script-url */
import produce from "immer";
import { addOutline, closeOutline } from 'ionicons/icons';
import { isArray } from "lodash";
import React, { useCallback, useMemo, useState } from 'react';
import { AppBackButton, AppButton, AppButtons, AppChip, AppContent, AppFormComposer, AppIcon, AppItem, AppModal } from '.';
import { isUndefined, removeAtIndex } from '../util';
import prettyTitle from '../util/prettyTitle';
import { inputStatusColorMap } from "./AppFormInput";
import { findSubSchema } from './forms/AppForm';
import { AppFormErrorsItem } from "./forms/AppFormErrorsItem";
import { AppFormLabel } from "./forms/AppFormLabel";
export const findShortestValue = val => {
  /**This looks like vooodooo, but it is just displaying the value 
                   * that is the shortest, which is usually the title || name */
  const standard_values = ["name", "title", "id"];
  const keys = Object.keys(val);
  const standard_keys = keys.filter(k => standard_values.includes(k));

  if (standard_keys.length > 0) {
    return val[standard_keys[0]];
  }

  if (isArray(val['values'])) {
    return val['values'].map(x => String(x)).join(' ');
  }

  return String(Object.values(val).sort((a, b) => String(a).length - String(b).length).filter(x => x.length > 2)[0]);
};
/**
 * Component for input that displays validation errors
 */

const AppFormArrayInput = props => {
  const {
    property,
    instanceRef,
    onChange,
    customTitleFunction,
    propertyInfo,
    customComponentMap,
    hiddenFields,
    lockedFields,
    showFields,
    required,
    objectSchema,
    rootSchema,
    customItemComponent
  } = props;
  const existing_data = instanceRef.current[property] ? instanceRef.current[property] : [];
  const [errors, setErrors] = useState(undefined);
  const [inputStatus, setInputStatus] = useState(existing_data.length > 0 ? "valid" : "empty");
  const [isInsertingItem, setIsInsertingItem] = useState(false);
  const [value, setValue] = useState(existing_data);
  const [edittingItemIndex, setEditingItemIndex] = useState();
  const propertyFormattedName = prettyTitle(propertyInfo.title || property);
  const inputStatusColor = inputStatusColorMap[inputStatus];

  const beginInsertItem = (val = {}) => {
    if (isUndefined(value)) {
      setValue([]);
    }

    ;
    setIsInsertingItem(true);
  };

  const editItem = index => {
    setEditingItemIndex(index);
    beginInsertItem();
  };

  const onSubmitItem = useCallback(async item => {
    const newValue = produce(value, draftValue => {
      if (typeof edittingItemIndex !== "undefined") {
        draftValue[edittingItemIndex] = item;
      } else {
        draftValue.push(item);
      }
    });
    const [validationStatus, errors] = await onChange(property, newValue);
    setIsInsertingItem(false);
    setValue(newValue);
    setInputStatus(validationStatus);
    setErrors(errors);
    setEditingItemIndex(undefined);
  }, [edittingItemIndex, onChange, property, value]);
  const onBackPressed = useCallback(() => {
    setIsInsertingItem(false);
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppItem, {
    href: "javascript:void(0)",
    onClick: e => {
      beginInsertItem();
    }
  }, /*#__PURE__*/React.createElement(AppFormLabel, {
    required: required,
    onClick: () => {
      beginInsertItem();
    },
    name: propertyFormattedName,
    color: inputStatusColor
  }), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => {
      beginInsertItem();
    },
    fill: "solid",
    color: "primary"
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: addOutline
  })))), /*#__PURE__*/React.createElement("div", {
    hidden: !isInsertingItem
  }, /*#__PURE__*/React.createElement(AppModal, {
    isOpen: isInsertingItem,
    onDismiss: () => onBackPressed()
  }, /*#__PURE__*/React.createElement(AppContent, null, useMemo(() => customItemComponent ? customItemComponent : /*#__PURE__*/React.createElement(AppFormComposer, {
    showFields: showFields,
    hiddenFields: hiddenFields,
    lockedFields: lockedFields,
    customComponentMap: customComponentMap,
    rootSchema: rootSchema,
    objectSchema: findSubSchema(rootSchema, objectSchema, propertyInfo),
    data: typeof edittingItemIndex !== "undefined" ? value[edittingItemIndex] : {},
    onSubmit: onSubmitItem
  }, /*#__PURE__*/React.createElement(AppBackButton, {
    onClick: () => onBackPressed()
  })), [customItemComponent, showFields, hiddenFields, lockedFields, customComponentMap, rootSchema, objectSchema, propertyInfo, edittingItemIndex, value, onSubmitItem, onBackPressed])))), value && value.filter(Boolean).map((val, i) => {
    return /*#__PURE__*/React.createElement(AppItem, {
      href: "javascript:void(0)",
      onClick: e => {
        const isCloseButton = e.target.className.split(' ').includes("close-button");

        if (!isCloseButton) {
          editItem(i);
        }
      },
      lines: "full"
    }, /*#__PURE__*/React.createElement(AppButtons, {
      slot: "start"
    }), /*#__PURE__*/React.createElement(AppChip, {
      key: i
    }, customTitleFunction ? customTitleFunction(val) : /*#__PURE__*/React.createElement(React.Fragment, null, typeof val === "string" && val, typeof val === "object" && findShortestValue(val))), /*#__PURE__*/React.createElement(AppButtons, {
      slot: "end"
    }, /*#__PURE__*/React.createElement(AppButton, {
      className: "close-button",
      onClick: () => {
        setValue(x => removeAtIndex(i, x));
      }
    }, /*#__PURE__*/React.createElement(AppIcon, {
      icon: closeOutline
    }))));
  }), /*#__PURE__*/React.createElement(AppFormErrorsItem, {
    errors: errors
  }));
};

export default AppFormArrayInput;