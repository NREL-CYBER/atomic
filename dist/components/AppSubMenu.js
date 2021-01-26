import React from 'react';
import useAppLayout from '../hooks/useAppLayout';
import useCompletion from '../hooks/useCompletion';
import AppIcon from './AppIcon';
import AppItem from './AppItem';
import AppLabel from './AppLabel';

const AppSubMenu = ({
  pages
}) => {
  const currentPath = useAppLayout(x => x.path);
  const {
    pathStatusColor,
    isUnlocked
  } = useCompletion();
  return /*#__PURE__*/React.createElement(React.Fragment, null, pages.map(p => {
    const isCurrentPath = currentPath === p.path;
    const currentPathStatusColor = isCurrentPath ? "dark" : pathStatusColor(p.path);
    return /*#__PURE__*/React.createElement(AppItem, {
      lines: "none",
      key: p.path,
      color: isCurrentPath ? 'tertiary' : "clear",
      routerLink: isUnlocked(p.path) ? p.path : undefined
    }, /*#__PURE__*/React.createElement(AppIcon, {
      color: currentPathStatusColor,
      slot: "start",
      icon: p.icon
    }), /*#__PURE__*/React.createElement(AppLabel, {
      color: currentPathStatusColor
    }, p.title));
  }));
};

export default AppSubMenu;