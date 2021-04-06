/**
 * Next step button
 */
import { arrowForwardOutline } from "ionicons/icons";
import React from "react";
import { AppButton, AppButtons, AppIcon, AppItemDivider, AppToolbar } from "..";
import { useAppLayout, useCompletion } from "../../hooks";
export const AppContinueButton = () => {
  const {
    allPageRoutes,
    path
  } = useAppLayout();
  const {
    isUnlocked,
    pathStatusColor,
    isValid
  } = useCompletion();
  const continueRoute = allPageRoutes.find(({
    path
  }) => isUnlocked(path) && !isValid(path));
  const statusColor = continueRoute ? pathStatusColor(continueRoute.path) : "clear";
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppToolbar, {
    color: "clear"
  }, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, continueRoute && path !== continueRoute.path ? /*#__PURE__*/React.createElement(AppButton, {
    fill: "clear",
    color: statusColor,
    routerDirection: "forward",
    routerLink: continueRoute.path
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: continueRoute.icon
  }), continueRoute.title, /*#__PURE__*/React.createElement(AppIcon, {
    icon: arrowForwardOutline
  })) : /*#__PURE__*/React.createElement(React.Fragment, null))), /*#__PURE__*/React.createElement(AppItemDivider, null));
};