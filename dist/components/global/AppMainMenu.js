import React, { memo } from 'react';
import { AppIcon, AppItem, AppLabel, AppList, AppListHeader, AppMenu, AppMenuToggle } from '..';
import { useAppLayout, useCompletion } from '../../hooks';
import { useState } from 'react';

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
      }, /*#__PURE__*/React.createElement(AppIcon, {
        color: isOnPath ? "medium" : pathColor,
        slot: "start",
        icon: r.icon
      }), /*#__PURE__*/React.createElement(AppLabel, {
        color: isOnPath ? "medium" : pathColor
      }, r.title)));
    });
  }

  return /*#__PURE__*/React.createElement(AppMenu, {
    type: "overlay",
    side: "start",
    contentId: "main"
  }, pageSections.map(([section, routes]) => /*#__PURE__*/React.createElement(AppList, {
    lines: "none",
    key: section
  }, /*#__PURE__*/React.createElement(AppListHeader, null, section), renderlistItems(routes))));
};

export default /*#__PURE__*/memo(AppMainMenu);