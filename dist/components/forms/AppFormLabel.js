import { AppBadge, AppButtons, AppGrid, AppText } from "../../entry.ts";
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
      minWidth: 230,
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement(AppBadge, {
    color: "clear"
  }, /*#__PURE__*/React.createElement(AppGrid, null, /*#__PURE__*/React.createElement(AppText, {
    color: color
  }, required && color !== "favorite" && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "red"
    }
  }, "*"), "            ", name)))));
};