/**
 * Next step button
 */
import { arrowForwardOutline } from "ionicons/icons";
import React from "react";
import { AppButton, AppButtons, AppIcon } from "..";
import { useAppLayout, useCompletion } from "../../hooks";
export const AppNextButton = ({
  fill = "solid"
}) => {
  const next = useAppLayout(x => x.nextPage);
  const {
    isUnlocked,
    pathStatusColor
  } = useCompletion();
  const statusColor = pathStatusColor(next.path);
  const nextButtonUnlocked = isUnlocked(next.path);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, /*#__PURE__*/React.createElement(AppButton, {
    disabled: !nextButtonUnlocked,
    fill: fill,
    color: statusColor,
    routerDirection: "forward",
    routerLink: next.path
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: next.icon
  }), next.title, /*#__PURE__*/React.createElement(AppIcon, {
    icon: arrowForwardOutline
  }))));
};