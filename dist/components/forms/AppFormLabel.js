import { AppLabel } from "atomic";
import React from "react";
export const AppFormLabel = ({
  name,
  color,
  info,
  required,
  onClick
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    minWidth: 200,
    fontSize: 11
  }
}, /*#__PURE__*/React.createElement(AppLabel, {
  color: color
}, required && color !== "favorite" && /*#__PURE__*/React.createElement("span", {
  style: {
    color: "red"
  }
}, "*"), "            ", name));