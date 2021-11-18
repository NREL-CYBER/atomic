/* eslint-disable no-script-url */
import { AppBadge, AppCol, AppGrid, AppLabel, AppRow, AppText } from "atomic";
import produce from "immer";
import { addSharp, removeOutline, returnDownForwardOutline } from 'ionicons/icons';
import { isArray, isNull, values } from "lodash";
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
import { AppTableList } from "./global/AppTable";
export const VisualizeValue = ({
  customRenderMap,
  propertyInfo,
  value
}) => {
  const id = propertyInfo.$id || propertyInfo.$ref;

  if (id && customRenderMap && typeof customRenderMap[id] !== "undefined") {
    return customRenderMap[id](value);
  }

  const length = String(JSON.stringify(value)).length;

  if (length === 2) {
    return /*#__PURE__*/React.createElement(React.Fragment, null);
  }

  return /*#__PURE__*/React.createElement(AppBadge, {
    color: "tertiary"
  }, length, " bytes");
  const title = propertyInfo.title || propertyInfo.$ref || propertyInfo.$id || "";

  if (typeof value === "undefined" || isNull(value)) {
    return /*#__PURE__*/React.createElement(React.Fragment, null);
  }

  if (typeof value === "object") {
    if (isArray(value)) {
      return /*#__PURE__*/React.createElement(AppCol, {
        size: "20"
      }, "Array", /*#__PURE__*/React.createElement(AppTableList, {
        type: title,
        rows: Object.keys(value[0]).filter(x => x !== "uuid"),
        data: value
      }));
    }

    return /*#__PURE__*/React.createElement(AppGrid, null, /*#__PURE__*/React.createElement(AppRow, null, /*#__PURE__*/React.createElement(AppCol, {
      size: "4"
    }), /*#__PURE__*/React.createElement(AppCol, {
      size: "20"
    }, /*#__PURE__*/React.createElement(AppTableList, {
      type: title,
      rows: Object.keys(value).filter(x => x !== "uuid"),
      data: [value]
    }))));
  }

  if (typeof value === "string") {
    return /*#__PURE__*/React.createElement(AppGrid, null, /*#__PURE__*/React.createElement(AppRow, null, /*#__PURE__*/React.createElement(AppCol, {
      size: "2"
    }), /*#__PURE__*/React.createElement(AppCol, {
      size: "20"
    }, value.length > 50 ? /*#__PURE__*/React.createElement(AppText, null, value) : /*#__PURE__*/React.createElement(AppChip, null, value)), /*#__PURE__*/React.createElement(AppCol, {
      size: "2"
    })));
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, String(value) + " " + typeof value, "TEST");
};
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
    propertyInfo,
    hiddenFields,
    lockedFields,
    showFields,
    required,
    objectSchema,
    rootSchema,
    dependencyMap,
    customInputMap,
    customRenderMap
  } = props;
  const existing_data = instanceRef.current[property] ? instanceRef.current[property] : [];
  const [errors, setErrors] = useState(undefined);
  const [inputStatus, setInputStatus] = useState(existing_data.length > 0 ? "valid" : "empty");
  const [isInsertingItem, setIsInsertingItem] = useState(false);
  const [value, setValue] = useState(existing_data);
  const [editingItemIndex, setEditingItemIndex] = useState();
  const propertyFormattedName = prettyTitle(propertyInfo.title || property);
  const inputStatusColor = inputStatusColorMap[inputStatus];

  const beginInsertItem = index => {
    setEditingItemIndex(index);

    if (isUndefined(value)) {
      setValue([]);
    }

    ;
    setIsInsertingItem(true);
  };

  const editItem = index => {
    beginInsertItem(index);
  };

  const deleteItem = useCallback(async i => {
    const newValue = removeAtIndex(i, value);
    const validationResult = onChange(property, newValue);
    validationResult.then(([validationStatus, errors]) => {
      setIsInsertingItem(false);
      setValue(newValue);
      setInputStatus(validationStatus);
      setErrors(errors);
      setEditingItemIndex(undefined);
    });
    return validationResult;
  }, [onChange, property, value]);
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
      setValue(newValue);
      setErrors(errors);

      if (errors) {
        return;
      }

      setIsInsertingItem(false);
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
  const customItemComponent = customInputMap && customInputMap[itemId];
  const subSchema = findSubSchema(rootSchema, objectSchema, propertyInfo);
  const elementTitle = propertyFormattedName + "[" + (typeof editingItemIndex === "number" ? editingItemIndex : values.length) + "]";
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppItem, {
    onClick: e => {
      beginInsertItem(values.length);
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
      beginInsertItem(values.length);
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
    customRenderMap,
    customInputMap,
    rootSchema,
    dependencyMap,
    objectSchema: subSchema,
    onChange: (_, v) => {
      return onSubmitItem(v);
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
    customInputMap: customInputMap,
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
      lines: "none",
      key: i,
      color: "paper",
      onClick: e => {
        const isCloseButton = e.target.className.split(' ').includes("close-button");

        if (!isCloseButton) {
          editItem(i);
        }
      }
    }, /*#__PURE__*/React.createElement(AppButtons, {
      slot: "start"
    }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppIcon, {
      icon: returnDownForwardOutline
    }))), /*#__PURE__*/React.createElement(VisualizeValue, {
      customRenderMap: customRenderMap,
      propertyInfo: propertyInfo,
      value: val
    }), /*#__PURE__*/React.createElement(AppButtons, {
      slot: "end"
    }, /*#__PURE__*/React.createElement(AppButton, {
      fill: "clear",
      color: "danger",
      className: "close-button",
      onClick: () => {
        deleteItem(i);
      }
    }, /*#__PURE__*/React.createElement(AppIcon, {
      icon: removeOutline
    }))));
  }), value.length > 0 && /*#__PURE__*/React.createElement(AppItem, {
    onClick: id => beginInsertItem(value.length)
  }, /*#__PURE__*/React.createElement(AppLabel, null, /*#__PURE__*/React.createElement(AppIcon, {
    color: "primary",
    icon: addSharp
  }))), /*#__PURE__*/React.createElement(AppFormErrorsItem, {
    errors: errors
  }));
};

export default AppFormArrayInput;