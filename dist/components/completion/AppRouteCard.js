import { checkmark } from "ionicons/icons";
import React from "react";
import { useCompletion } from "../..";
import { AppCard, AppList, AppItem, AppButtons, AppIcon, AppTitle } from "..";

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
    title: /*#__PURE__*/React.createElement(AppList, null, /*#__PURE__*/React.createElement(AppItem, {
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