import { AppButtons, AppLabel } from "atomic";
import React from "react";
import { useMediaQuery } from "../../hooks";
export const AppFormLabel = ({
  name,
  color,
  info,
  required,
  onClick
}) => {
  const isDesktop = useMediaQuery("only screen and (min-width: 500px)");
  return /*#__PURE__*/React.createElement(AppButtons, {
    slot: "start"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 200,
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement(AppLabel, {
    position: !isDesktop ? "stacked" : undefined,
    color: color
  }, required && color !== "favorite" && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "red"
    }
  }, "*"), "            ", name)));
};