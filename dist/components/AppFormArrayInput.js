/* eslint-disable no-script-url */
import { AppLabel } from "atomic";
import produce from "immer";
import { addSharp, removeOutline, returnDownForwardOutline } from 'ionicons/icons';
import { isArray, values } from "lodash";
import React, { useCallback, useState } from 'react';
import { AppBackButton, AppButton, AppButtons, AppChip, AppForm, AppIcon, AppItem, AppModal } from '.';
import { isUndefined, removeAtIndex } from '../util';
import prettyTitle from '../util/prettyTitle';
import { uniqueObjects } from "../util/unique";
import AppCard from "./AppCard";
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

  return String(Object.values(val).sort((a, b) => String(a).length - String(b).length).filter(x => x.length > 0)[0]);
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
    dependencyMap
  } = props;
  const existing_data = instanceRef.current[property] ? instanceRef.current[property] : [];
  const [errors, setErrors] = useState(undefined);
  const [inputStatus, setInputStatus] = useState(existing_data.length > 0 ? "valid" : "empty");
  const [isInsertingItem, setIsInsertingItem] = useState(false);
  const [value, setValue] = useState(existing_data);
  const [editingItemIndex, setEditingItemIndex] = useState();
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
    const newValue = uniqueObjects(produce(value, draftValue => {
      if (typeof editingItemIndex !== "undefined") {
        draftValue[editingItemIndex] = item;
      } else {
        draftValue.push(item);
      }
    }));
    const validationResult = onChange(property, newValue);
    validationResult.then(([validationStatus, errors]) => {
      setIsInsertingItem(false);
      setValue(newValue);
      setInputStatus(validationStatus);
      setErrors(errors);
      setEditingItemIndex(undefined);
    });
    return validationResult;
  }, [editingItemIndex, onChange, property, value]);
  const onBackPressed = useCallback(() => {
    setIsInsertingItem(false);
  }, []);
  const itemId = propertyInfo.items?.$ref?.toString() || "";
  const customItemComponent = customComponentMap && customComponentMap[itemId];
  const subSchema = findSubSchema(rootSchema, objectSchema, propertyInfo);
  const elementTitle = propertyFormattedName + "[" + (typeof editingItemIndex === "number" ? editingItemIndex : values.length) + "]";
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppItem, {
    onClick: e => {
      beginInsertItem();
    }
  }, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "start"
  }, /*#__PURE__*/React.createElement(AppLabel, {
    color: inputStatusColor
  }, "[", value.length, "]")), value.length === 0 && /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, /*#__PURE__*/React.createElement(AppButton, {
    fill: "clear",
    color: "primary",
    className: "close-button"
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: addSharp
  }))), /*#__PURE__*/React.createElement(AppFormLabel, {
    required: required,
    onClick: () => {
      beginInsertItem();
    },
    name: propertyFormattedName + " ",
    color: inputStatusColor
  })), /*#__PURE__*/React.createElement("div", {
    hidden: !isInsertingItem
  }, /*#__PURE__*/React.createElement(AppModal, {
    isOpen: isInsertingItem,
    onDismiss: () => onBackPressed()
  }, customItemComponent ? /*#__PURE__*/React.createElement(AppCard, {
    title: elementTitle
  }, customItemComponent({
    showFields,
    hiddenFields,
    lockedFields,
    customComponentMap,
    rootSchema,
    dependencyMap,
    objectSchema: subSchema,
    onChange: (_, value) => {
      return onSubmitItem(value);
    },
    instanceRef: {
      current: {
        item: value && typeof editingItemIndex !== 'undefined' ? value[editingItemIndex] ? subSchema.type === "object" ? {} : subSchema.type === "array" ? [] : undefined : undefined : undefined
      }
    },
    property: "item",
    propertyInfo,
    context: value
  })) : /*#__PURE__*/React.createElement(AppForm, {
    title: elementTitle,
    showFields: showFields,
    hiddenFields: hiddenFields,
    lockedFields: lockedFields,
    customComponentMap: customComponentMap,
    rootSchema: rootSchema,
    dependencyMap: dependencyMap,
    objectSchema: subSchema,
    data: typeof editingItemIndex !== "undefined" ? value[editingItemIndex] : {},
    context: value,
    onSubmit: onSubmitItem
  }, /*#__PURE__*/React.createElement(AppBackButton, {
    onClick: () => onBackPressed()
  })))), value && value.filter(Boolean).map((val, i) => {
    return /*#__PURE__*/React.createElement(AppItem, {
      color: "paper",
      onClick: e => {
        const isCloseButton = e.target.className.split(' ').includes("close-button");

        if (!isCloseButton) {
          editItem(i);
        }
      },
      lines: "full"
    }, /*#__PURE__*/React.createElement(AppButtons, {
      slot: "start"
    }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppIcon, {
      icon: returnDownForwardOutline
    }))), /*#__PURE__*/React.createElement(AppChip, {
      key: i
    }, customTitleFunction ? customTitleFunction(val) : /*#__PURE__*/React.createElement(React.Fragment, null, typeof val === "string" && val, typeof val === "object" && findShortestValue(val))), /*#__PURE__*/React.createElement(AppButtons, {
      slot: "end"
    }, /*#__PURE__*/React.createElement(AppButton, {
      fill: "clear",
      color: "danger",
      className: "close-button",
      onClick: () => {
        setValue(x => removeAtIndex(i, x));
      }
    }, /*#__PURE__*/React.createElement(AppIcon, {
      icon: removeOutline
    }))));
  }), value.length > 0 && /*#__PURE__*/React.createElement(AppItem, {
    onClick: beginInsertItem
  }, /*#__PURE__*/React.createElement(AppLabel, null, /*#__PURE__*/React.createElement(AppIcon, {
    color: "primary",
    icon: addSharp
  })), /*#__PURE__*/React.createElement(AppButton, {
    expand: "full",
    fill: "clear",
    onClick: () => {
      beginInsertItem();
    }
  })), /*#__PURE__*/React.createElement(AppFormErrorsItem, {
    errors: errors
  }));
};

export default AppFormArrayInput;