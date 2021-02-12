import React, { memo } from 'react';
import { AppIcon, AppItem, AppLabel, AppList, AppListHeader, AppMenu, AppMenuToggle } from '..';
import { useAppLayout } from '../../hooks';
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
  const [pageEections, setSections] = useState(Object.entries(sections));

  function renderlistItems(list) {
    return list.filter(route => !!route.path).map(p => /*#__PURE__*/React.createElement(AppMenuToggle, {
      key: p.title,
      "auto-hide": "false"
    }, /*#__PURE__*/React.createElement(AppItem, {
      detail: false,
      routerLink: p.path,
      color: path.startsWith(p.path) ? 'tertiary' : undefined
    }, /*#__PURE__*/React.createElement(AppIcon, {
      slot: "start",
      icon: p.icon
    }), /*#__PURE__*/React.createElement(AppLabel, null, p.title))));
  }

  return /*#__PURE__*/React.createElement(AppMenu, {
    type: "overlay",
    side: "start",
    contentId: "main"
  }, pageEections.map(([section, routes]) => /*#__PURE__*/React.createElement(AppList, {
    lines: "none",
    key: section
  }, /*#__PURE__*/React.createElement(AppListHeader, null, section), renderlistItems(routes))));
};

export default /*#__PURE__*/memo(AppMainMenu);