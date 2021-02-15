/**
 * Next step button
 */
import { arrowForwardOutline } from "ionicons/icons";
import React from "react";
import { AppToolbar, AppButtons, AppButton, AppIcon, AppItemDivider } from "..";
import { useAppLayout, useCompletion } from "../../hooks";
import { useEffect } from "react";
export const AppNextButton = () => {
  const next = useAppLayout(x => x.nextPage);
  const {
    isUnlocked,
    pathStatusColor,
    paths
  } = useCompletion();
  const statusColor = pathStatusColor(next.path);
  const nextButtonUnlocked = isUnlocked(next.path);
  useEffect(() => {
    console.log(next, paths[next.path]);
  }, [next, paths]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppToolbar, {
    color: "clear"
  }, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, /*#__PURE__*/React.createElement(AppButton, {
    disabled: !nextButtonUnlocked,
    fill: "solid",
    color: statusColor,
    routerDirection: "forward",
    routerLink: next.path
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: next.icon
  }), next.title, /*#__PURE__*/React.createElement(AppIcon, {
    icon: arrowForwardOutline
  })))), /*#__PURE__*/React.createElement(AppItemDivider, null));
};