import { AppBadge, AppButtons, AppChip, AppCol, AppGrid, AppLabel, AppRow, AppText, prettyTitle } from "../../entry.ts";
import { isArray } from "lodash";
import React, { useState } from "react";
import { VisualizeValue } from "../AppJsonDisplay";
export const AppTableList = ({
  rows,
  data
}) => {
  const [rowName, rowNames] = useState(rows.filter(x => x !== "uuid"));

  if (typeof data === "undefined") {
    return /*#__PURE__*/React.createElement(AppChip, {
      color: "warning"
    }, "undefined");
  }

  return /*#__PURE__*/React.createElement("table", {
    style: {
      borderRadius: 10,
      backgroundColor: "rgba(150,150,150,0.1)",
      width: "100%"
    }
  }, data && data.map && data.map((item, i) => /*#__PURE__*/React.createElement("div", {
    style: {
      backgroundColor: i % 2 === 0 ? "rgba(0,0,0,0.015)" : "rgba(0,0,0,0.05)"
    }
  }, rowName.filter(x => x !== "uuid").map(row => {
    console.log(row, item[row], "table-list");
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppRow, null, /*#__PURE__*/React.createElement(AppCol, null, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 4,
        textAlign: "left"
      }
    }, /*#__PURE__*/React.createElement(AppGrid, null, /*#__PURE__*/React.createElement(AppRow, null, /*#__PURE__*/React.createElement(AppCol, null, /*#__PURE__*/React.createElement(AppBadge, {
      color: "clear"
    }, prettyTitle(row))))))), /*#__PURE__*/React.createElement(AppCol, null, /*#__PURE__*/React.createElement("div", {
      style: {
        width: "100%",
        textAlign: "right",
        float: 'right'
      }
    }, typeof item[row] === "object" && /*#__PURE__*/React.createElement(VisualizeValue, {
      value: item[row],
      propertyInfo: {}
    }), ['string', 'number'].includes(typeof item[row]) && /*#__PURE__*/React.createElement(AppButtons, {
      slot: "end"
    }, /*#__PURE__*/React.createElement(AppGrid, null, item[row].length < 100 ? /*#__PURE__*/React.createElement(AppChip, null, JSON.stringify(item[row])) : /*#__PURE__*/React.createElement(AppText, {
      color: "medium"
    }, JSON.stringify(item[row]))))))));
  }))));
};
export const AppTable = ({
  columns,
  data
}) => {
  const [columnNames] = useState(columns.filter(x => x !== "uuid").filter(column => data.map(row => JSON.stringify(row[column] || "").length)));

  if (typeof data === "undefined" || JSON.stringify(data) === "{}") {
    return /*#__PURE__*/React.createElement(AppChip, {
      color: "warning"
    }, "undefined");
  }

  console.log(data, "TABLE DATA");
  return /*#__PURE__*/React.createElement("table", {
    style: {
      borderRadius: 10,
      backgroundColor: "rgba(150,150,150,0.1)",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderRadius: 10,
      backgroundColor: "rgba(2,2,2,0.1)"
    }
  }, columnNames.map(name => /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement(AppGrid, null, /*#__PURE__*/React.createElement(AppLabel, {
    color: "dark"
  }, prettyTitle(name)))))), data && data.map && data.map((item, i) => /*#__PURE__*/React.createElement("tr", {
    style: {
      textAlign: "center",
      backgroundColor: i % 2 === 0 ? "rgba(0,0,0,0.015)" : "rgba(0,0,0,0.05)"
    }
  }, columnNames.map(column => {
    // console.log(column, item[column])
    return /*#__PURE__*/React.createElement("td", {
      style: {
        padding: 10,
        textAlign: "left",
        backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "rgba(255,255,255,0.001)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "left!important"
      }
    }, /*#__PURE__*/React.createElement(AppLabel, null, ['string', 'number'].includes(typeof item[column]) && item[column], ['object'].includes(typeof item[column]) && JSON.stringify(item[column]), isArray(item[column]) && "[" + item[column].length + "]")));
  }))));
};