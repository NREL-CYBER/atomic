/**
 * Next step button
 */
import AppButton from "../AppButton";
import { useAppLayout, useCompletion } from "../../hooks";
import React from "react";
import { AppIcon } from "..";
import { arrowForwardOutline } from "ionicons/icons";
export const AppNextPageButton = () => {
  const next = useAppLayout(x => x.nextPage) || {
    path: "/",
    title: "",
    icon: ""
  };
  const {
    isUnlocked,
    pathStatusColor
  } = useCompletion();
  const disabled = !isUnlocked(next.path);
  const color = pathStatusColor(next.path);
  return /*#__PURE__*/React.createElement(AppButton, {
    fill: "solid",
    color: color,
    routerDirection: "forward",
    routerLink: next.path,
    disabled: disabled
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: next.icon
  }), next.title, /*#__PURE__*/React.createElement(AppIcon, {
    icon: arrowForwardOutline
  }));
};