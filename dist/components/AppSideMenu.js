import { IonSplitPane } from '@ionic/react';
import React from 'react';
import AppList from './AppList';
import AppRouterOutlet from './AppRouterOutlet';
import AppSubMenu from './AppSubMenu';
/**
 * Component to handle the creation of side menus
 */

const AppSideMenu = ({
  id,
  root
}) => {
  return /*#__PURE__*/React.createElement(IonSplitPane, {
    className: "side-bar",
    when: "xs",
    contentId: id
  }, /*#__PURE__*/React.createElement(AppList, null, root.nested && /*#__PURE__*/React.createElement(AppSubMenu, {
    pages: root.nested
  })), /*#__PURE__*/React.createElement(AppRouterOutlet, {
    id: id,
    root: root
  }));
};

export default AppSideMenu;