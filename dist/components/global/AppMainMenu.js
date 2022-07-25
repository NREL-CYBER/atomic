import { AppButtons, AppContent } from "../../entry.ts";
import React, { memo, useState } from 'react';
import { AppIcon, AppItem, AppLabel, AppList, AppListHeader, AppMenu, AppMenuToggle } from '..';
import { useAppLayout, useCompletion } from "../../hooks";

/**
 * @param sections  a key value object containing all sections of routes 
 */
export const AppFixedMainMenu = ({
  sections
}) => {
  const {
    path
  } = useAppLayout();
  const [pageSections] = useState(Object.entries(sections));
  const {
    pathStatusColor,
    isUnlocked
  } = useCompletion();

  function renderlistItems(list) {
    return list.filter(route => !!route.path).map(r => {
      const pathColor = pathStatusColor(r.path) || "medium";
      const isPathUnlocked = isUnlocked(r.path);
      const isOnPath = path === r.path;
      return /*#__PURE__*/React.createElement(AppItem, {
        key: r.path,
        detail: false,
        routerLink: isPathUnlocked ? r.path : undefined,
        color: "clear"
      }, /*#__PURE__*/React.createElement(AppButtons, {
        slot: "start"
      }, /*#__PURE__*/React.createElement(AppIcon, {
        color: isOnPath ? "tertiary" : pathColor,
        slot: "start",
        icon: r.icon
      })), /*#__PURE__*/React.createElement(AppLabel, {
        color: isOnPath ? "tertiary" : pathColor
      }, r.title));
    });
  }

  return /*#__PURE__*/React.createElement("div", null, pageSections.map(([section, routes]) => /*#__PURE__*/React.createElement(AppList, {
    lines: "none",
    key: section
  }, renderlistItems(routes))));
};
/**
 * @param sections  a key value object containing all sections of routes 
 */

const AppMainMenu = ({
  sections
}) => {
  const {
    path
  } = useAppLayout();
  const [pageSections] = useState(Object.entries(sections));
  const {
    pathStatusColor,
    isUnlocked
  } = useCompletion();

  function renderlistItems(list) {
    return list.filter(route => !!route.path).map(r => {
      const pathColor = pathStatusColor(r.path) || "medium";
      const isPathUnlocked = isUnlocked(r.path);
      const isOnPath = path === r.path;
      return /*#__PURE__*/React.createElement(AppMenuToggle, {
        key: r.title,
        "auto-hide": "false"
      }, /*#__PURE__*/React.createElement(AppItem, {
        detail: false,
        routerLink: isPathUnlocked ? r.path : undefined,
        color: isOnPath ? 'tertiary' : "clear"
      }, /*#__PURE__*/React.createElement(AppButtons, {
        slot: "start"
      }, /*#__PURE__*/React.createElement(AppIcon, {
        color: isOnPath ? "medium" : pathColor,
        slot: "start",
        icon: r.icon
      })), /*#__PURE__*/React.createElement(AppLabel, {
        color: isOnPath ? "medium" : pathColor
      }, r.title)));
    });
  }

  return /*#__PURE__*/React.createElement(AppMenu, {
    type: "overlay",
    side: "start",
    contentId: "main"
  }, /*#__PURE__*/React.createElement(AppContent, null, pageSections.map(([section, routes]) => /*#__PURE__*/React.createElement(AppList, {
    lines: "none",
    key: section
  }, /*#__PURE__*/React.createElement(AppListHeader, null, section), renderlistItems(routes)))));
};

export default /*#__PURE__*/memo(AppMainMenu);