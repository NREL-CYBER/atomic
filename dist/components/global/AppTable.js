import { AppBadge, AppButtons, AppChip, AppCol, AppGrid, AppLabel, AppRow, AppText, AppTitle } from "atomic";
import produce from "immer";
import { isArray } from "lodash";
import React, { useState } from "react";
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
  }, rowName.filter(x => x !== "uuid").map(row => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppRow, null, /*#__PURE__*/React.createElement(AppCol, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 4,
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement(AppGrid, null, /*#__PURE__*/React.createElement(AppBadge, {
    color: "clear"
  }, row)))), /*#__PURE__*/React.createElement(AppCol, null, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      textAlign: "right",
      float: 'right'
    }
  }, ['object'].includes(typeof item[row]) ? isArray(item[row]) && !['string', 'number'].includes(typeof item[row][0]) ? /*#__PURE__*/React.createElement(AppTable, {
    columns: Object.keys(item[row][0]),
    data: item[row]
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, item[row]) : ['string', 'number'].includes(typeof item[row]) ? /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, /*#__PURE__*/React.createElement(AppGrid, null, item[row].length < 100 ? /*#__PURE__*/React.createElement(AppChip, null, item[row]) : /*#__PURE__*/React.createElement(AppText, {
    color: "medium"
  }, item[row]))) : /*#__PURE__*/React.createElement(React.Fragment, null)))))))));
};
export const AppTable = ({
  columns,
  data
}) => {
  const [columnNames, setColumnNames] = useState(columns.filter(x => x !== "uuid"));

  function doReorder(event) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);
    const newNames = produce(columnNames, names => {
      const {
        from,
        to
      } = event.detail;
      names[from] = names.splice(to, 1, names[from])[0];
    });
    setColumnNames(newNames); // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group

    event.detail.complete();
  }

  if (typeof data === "undefined" || JSON.stringify(data) === "{}") {
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
  }, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderRadius: 10,
      backgroundColor: "rgba(2,2,2,0.1)"
    }
  }, columnNames.map(name => /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement(AppTitle, null, name)))), data && data.map && data.map((item, i) => /*#__PURE__*/React.createElement("tr", {
    style: {
      textAlign: "center",
      backgroundColor: i % 2 === 0 ? "rgba(0,0,0,0.015)" : "rgba(0,0,0,0.05)"
    }
  }, columnNames.map(column => /*#__PURE__*/React.createElement("td", {
    style: {
      padding: 10,
      textAlign: "left",
      backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "rgba(255,255,255,0.001)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "left!important"
    }
  }, /*#__PURE__*/React.createElement(AppLabel, null, ['string', 'number'].includes(typeof item[column]) && item[column], ['object'].includes(typeof item[column]) && isArray(item[column]) && typeof item[column][0] === "object" && /*#__PURE__*/React.createElement(AppTable, {
    columns: Object.keys(item[column][0] || []),
    data: item[column]
  }), ['object'].includes(typeof item[column]) && isArray(item[column]) && typeof item[column] === "string" && item[column].map(x => /*#__PURE__*/React.createElement(AppChip, null, x)))))))));
};