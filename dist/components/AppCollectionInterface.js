function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable no-script-url */
import { AppButtons, AppText } from "atomic";
import { addOutline, pencilOutline } from "ionicons/icons";
import React, { useState } from "react";
import { AppButton, AppCard, AppCol, AppForm, AppGrid, AppIcon, AppItem, AppRow } from ".";
import { useAppSettings } from "../hooks/useAppSettings";
import { prettyTitle } from "../util";
import { VisualizeValue } from "./AppJsonDisplay";
import { AppPaginatedList } from "./AppPaginatedList";
export const AppCollectionInterface = ({
  store,
  showInsert = true,
  editFormProps,
  createFormProps,
  pageSize = 7,
  renderDetail,
  renderItem
}) => {
  const {
    setActive,
    activeInstance,
    schema,
    collection,
    index,
    identifier,
    insert
  } = store();
  const storeStatus = store(x => x.status);
  const selected = activeInstance();
  const {
    darkMode
  } = useAppSettings();
  const [status, setStatus] = useState(selected ? "view" : "idle");

  const beginInsert = () => {
    changeStatus("create", "");
  };

  const beginEdit = active => {
    changeStatus("edit", active);
  };

  const changeStatus = (status, active) => {
    setActive(active);
    setStatus("switch");
    setTimeout(() => {
      setStatus(status);
    }, 100);
  };

  const beginView = active => {
    changeStatus("view", active);
  };

  if (!identifier) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, "Error colleciton has no identifier");
  }

  const formProps = status === "create" ? createFormProps : editFormProps;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppGrid, null, /*#__PURE__*/React.createElement(AppRow, null, /*#__PURE__*/React.createElement(AppCol, {
    sizeXs: "24",
    sizeLg: "8",
    sizeMd: "12"
  }, storeStatus !== "booting" && storeStatus !== "importing", "   ", /*#__PURE__*/React.createElement(AppPaginatedList, {
    pageSize: pageSize,
    title: /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppButtons, {
      slot: "start"
    }, prettyTitle(collection), " collection (", index.length, ")"), showInsert && /*#__PURE__*/React.createElement(AppButtons, {
      slot: "end"
    }, /*#__PURE__*/React.createElement(AppButton, {
      color: "primary",
      onClick: beginInsert
    }, /*#__PURE__*/React.createElement(AppIcon, {
      icon: addOutline
    })))),
    renderItem: item => {
      // eslint-disable-next-line no-script-url
      const bgColor = selected === item ? "light" : undefined;
      const color = selected === item ? "favorite" : undefined;
      const idKeyPath = identifier || "uuid";
      const id = item[idKeyPath];
      return /*#__PURE__*/React.createElement(AppItem, {
        color: bgColor,
        onClick: () => beginView(id)
      }, renderItem ? renderItem(item) : /*#__PURE__*/React.createElement(AppButtons, {
        slot: "start"
      }, /*#__PURE__*/React.createElement(AppText, {
        color: color
      }, item.name)));
    },
    store: store
  })), /*#__PURE__*/React.createElement(AppCol, null, status === "idle" && /*#__PURE__*/React.createElement(AppCard, {
    title: ""
  }, /*#__PURE__*/React.createElement(AppButton, {
    fill: "outline",
    expand: "full",
    onClick: beginInsert
  }, "Add New")), status === "view" && /*#__PURE__*/React.createElement(AppCard, {
    title: /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppButtons, null, prettyTitle(collection) + " # " + selected ? selected[identifier] : ""), /*#__PURE__*/React.createElement(AppButtons, {
      slot: "end"
    }, /*#__PURE__*/React.createElement(AppButton, {
      color: "primary",
      onClick: () => {
        beginEdit(activeInstance()[identifier]);
      }
    }, /*#__PURE__*/React.createElement(AppIcon, {
      icon: pencilOutline
    }))))
  }, renderDetail ? renderDetail(selected) : /*#__PURE__*/React.createElement(VisualizeValue, {
    propertyInfo: schema.definitions[collection],
    value: selected
  })), schema && schema.definitions && schema.definitions[collection] && (status === "edit" || status === "create") && /*#__PURE__*/React.createElement(AppForm, _extends({
    rootSchema: schema,
    objectSchema: schema.definitions[collection],
    data: selected || {},
    hiddenFields: formProps === null || formProps === void 0 ? void 0 : formProps.hiddenFields
  }, formProps, {
    onSubmit: s => {
      const id = s[identifier];
      insert(id, s).then(() => {
        beginView(id);
        (formProps === null || formProps === void 0 ? void 0 : formProps.onSubmit) && formProps.onSubmit(s);
      });
    }
  }))))));
};