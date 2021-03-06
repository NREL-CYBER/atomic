import { AppCol, AppGrid, AppRow, AppText, AppChip } from "atomic";
import { isArray } from "lodash";
import { isNull } from "../util";
import { AppTable, AppTableList } from "./global/AppTable";
import React from "react";
import { useState } from "react";
export const AppJsonDisplay = ({
  customRenderMap,
  propertyInfo,
  value
}) => {
  const id = propertyInfo.$id || propertyInfo.$ref;
  const [show, setShow] = useState(false);
  const length = String(JSON.stringify(value)).length;
  const type = typeof value;

  if (!show && length > 100) {
    return /*#__PURE__*/React.createElement(AppChip, {
      onClick: () => setShow(true)
    }, length, " byte ", type);
  }

  if (id && customRenderMap && typeof customRenderMap[id] !== "undefined") {
    return customRenderMap[id](value);
  }

  const title = propertyInfo.title || propertyInfo.$ref || propertyInfo.$id || "";

  if (typeof value === "undefined" || isNull(value)) {
    return /*#__PURE__*/React.createElement(React.Fragment, null);
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

  if (typeof value === "object") {
    if (isArray(value)) {
      if (typeof value[0] === "string") {
        return /*#__PURE__*/React.createElement(AppChip, null, value.join(","));
      }

      return /*#__PURE__*/React.createElement(AppCol, {
        size: "20"
      }, /*#__PURE__*/React.createElement(AppTable, {
        columns: Object.keys(value[0] || {}).filter(x => x !== "uuid"),
        data: value
      }));
    }

    return /*#__PURE__*/React.createElement(AppGrid, null, /*#__PURE__*/React.createElement(AppRow, null, /*#__PURE__*/React.createElement(AppCol, {
      size: "20"
    }, /*#__PURE__*/React.createElement(AppTableList, {
      type: title,
      rows: Object.keys(value).filter(x => x !== "uuid"),
      data: [value]
    }))));
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, String(value) + " " + typeof value);
};
export const VisualizeValue = AppJsonDisplay;