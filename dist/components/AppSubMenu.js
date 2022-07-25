import React from 'react';
import useAppLayout from '../hooks/useAppLayout';
import useCompletion from '../hooks/useCompletion';
import AppIcon from './AppIcon';
import AppItem from './AppItem';
import AppLabel from './AppLabel';
import { AppButtons } from 'atomic';
import { useAppSettings } from '../hooks/useAppSettings';

const AppSubMenu = ({
  pages
}) => {
  const currentPath = useAppLayout(x => x.path);
  const {
    darkMode
  } = useAppSettings();
  const {
    pathStatusColor,
    isUnlocked
  } = useCompletion();
  return /*#__PURE__*/React.createElement(React.Fragment, null, pages.map(p => {
    const isCurrentPath = currentPath === p.path;
    const contractColor = darkMode ? "dark" : "light";
    const currentPathStatusColor = isCurrentPath ? contractColor : pathStatusColor(p.path);
    return /*#__PURE__*/React.createElement(AppItem, {
      lines: "none",
      key: p.path,
      color: isCurrentPath ? 'tertiary' : "clear",
      routerLink: isUnlocked(p.path) ? p.path : undefined
    }, /*#__PURE__*/React.createElement(AppButtons, {
      slot: "start"
    }, /*#__PURE__*/React.createElement(AppIcon, {
      color: currentPathStatusColor,
      slot: "start",
      icon: p.icon
    })), /*#__PURE__*/React.createElement(AppButtons, {
      slot: "start"
    }, /*#__PURE__*/React.createElement(AppLabel, {
      color: currentPathStatusColor
    }, p.title)));
  }));
};

export default AppSubMenu;