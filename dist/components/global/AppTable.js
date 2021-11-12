import { AppBadge, AppChip, AppGrid, AppLabel, AppTitle } from "atomic";
import produce from "immer";
import { isArray } from "lodash";
import React, { useState } from "react";
export const AppTableList = ({
  rows,
  type,
  data
}) => {
  const [rowName, rowNames] = useState(rows);
  return /*#__PURE__*/React.createElement("table", {
    style: {
      borderRadius: 10,
      backgroundColor: "rgba(150,150,150,0.1)",
      width: "100%"
    }
  }, data.map((item, i) => /*#__PURE__*/React.createElement("div", {
    style: {
      backgroundColor: i % 2 === 0 ? "rgba(0,0,0,0.015)" : "rgba(0,0,0,0.05)"
    }
  }, rowName.map(row => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("tr", {
    style: {
      padding: 10,
      backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "rgba(255,255,255,0.001)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement(AppChip, null, /*#__PURE__*/React.createElement(AppBadge, {
    color: "clear"
  }, row), /*#__PURE__*/React.createElement(AppGrid, null, /*#__PURE__*/React.createElement(AppLabel, null, ['string', 'number'].includes(typeof item[row]) ? item[row] : /*#__PURE__*/React.createElement(React.Fragment, null), ['object'].includes(typeof item[row]) && isArray(item[row]) && /*#__PURE__*/React.createElement(React.Fragment, null, "[", item[row].length, "]")))), ['object'].includes(typeof item[row]) && !isArray(item[row]) && /*#__PURE__*/React.createElement(AppTableList, {
    type: row,
    rows: Object.keys(item[row]),
    data: item[row]
  }))))))));
};
export const AppTable = ({
  columns,
  data
}) => {
  const [columnNames, setColumnNames] = useState(columns);

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
  }, columnNames.map(name => /*#__PURE__*/React.createElement("th", null, /*#__PURE__*/React.createElement(AppTitle, null, name)))), data.map((item, i) => /*#__PURE__*/React.createElement("tr", {
    style: {
      backgroundColor: i % 2 === 0 ? "rgba(0,0,0,0.015)" : "rgba(0,0,0,0.05)"
    }
  }, columnNames.map(column => /*#__PURE__*/React.createElement("td", {
    style: {
      padding: 10,
      backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "rgba(255,255,255,0.001)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(AppLabel, null, item[column])))))));
};