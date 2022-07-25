import { AppItem, AppLabel, AppText } from "../../entry.ts";
import React from "react";
export const AppFormErrorsItem = ({
  errors
}) => errors && errors.length > 0 ? /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppLabel, {
  position: "stacked",
  color: "danger"
}, errors.map((error, i) => /*#__PURE__*/React.createElement(AppText, {
  key: i
}, error)))) : /*#__PURE__*/React.createElement(React.Fragment, null);