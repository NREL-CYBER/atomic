/**
 * Next step button
 */
import { arrowForwardOutline } from "ionicons/icons";
import React from "react";
import { useAppLayout, useCompletion } from "../..";
import { AppToolbar, AppButtons, AppButton, AppIcon, AppItemDivider } from "..";
export const AppNextButton = () => {
  const next = useAppLayout(x => x.nextPage);
  const {
    isUnlocked,
    pathStatusColor
  } = useCompletion();
  const color = pathStatusColor(next.path);
  const nextButtonVisible = isUnlocked(next.path);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppToolbar, null, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, nextButtonVisible && /*#__PURE__*/React.createElement(AppButton, {
    fill: "solid",
    color: color,
    routerDirection: "forward",
    routerLink: next.path
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: next.icon
  }), next.title, /*#__PURE__*/React.createElement(AppIcon, {
    icon: arrowForwardOutline
  })))), /*#__PURE__*/React.createElement(AppItemDivider, null));
};