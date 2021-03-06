import { checkmark } from "ionicons/icons";
import React from "react";
import { AppCard, AppList, AppItem, AppButtons, AppIcon, AppTitle } from "..";
import { useCompletion } from "../../hooks";

const AppRouteCard = ({
  path,
  icon,
  title
}) => {
  const {
    pathStatusColor,
    isUnlocked,
    isValid
  } = useCompletion();
  const routeColor = pathStatusColor(path);
  return /*#__PURE__*/React.createElement(AppCard, {
    headerColor: "paper",
    title: /*#__PURE__*/React.createElement(AppList, {
      lines: "inset"
    }, /*#__PURE__*/React.createElement(AppItem, {
      color: "clear",
      routerLink: isUnlocked(path) ? path : undefined
    }, /*#__PURE__*/React.createElement(AppButtons, {
      slot: "start"
    }, /*#__PURE__*/React.createElement(AppIcon, {
      color: routeColor,
      size: "large",
      icon: icon
    }), /*#__PURE__*/React.createElement(AppTitle, {
      color: routeColor
    }, title)), /*#__PURE__*/React.createElement(AppButtons, {
      slot: "end"
    }, isValid(path) && /*#__PURE__*/React.createElement(AppIcon, {
      color: routeColor,
      size: "large",
      icon: checkmark
    }))))
  });
};

export default AppRouteCard;