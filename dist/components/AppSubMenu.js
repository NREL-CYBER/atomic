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
  return /*#__PURE__*/React.createElement(React.Fragment, null, pages.map(p => /*#__PURE__*/React.createElement(AppItem, {
    key: p.path,
    color: currentPath === p.path ? 'tertiary' : "dark",
    routerLink: isUnlocked(p.path) ? p.path : undefined
  }, /*#__PURE__*/React.createElement(AppIcon, {
    color: pathStatusColor(p.path),
    slot: "start",
    icon: p.icon
  }), /*#__PURE__*/React.createElement(AppLabel, {
    color: pathStatusColor(p.path)
  }, p.title))));
};

export default AppSubMenu;