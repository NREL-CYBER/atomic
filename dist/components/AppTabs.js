function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonTabs } from '@ionic/react';
import { AppBadge, AppIcon, AppLabel, AppRouterOutlet } from 'atomic';
import React, { useState } from 'react';
import { v4 } from 'uuid';
import AppTabButton from './AppTabButton';

/**
 * Component to display text with optional color
 */
const AppTabs = props => {
  const [currentTab, setCurrentTab] = useState(props.selectedTab);
  const [tabs] = useState(props.tabs.map(t => ({
    [t.path]: t
  })).reduce((a, b) => ({ ...a,
    ...b
  }), {}));
  return /*#__PURE__*/React.createElement(IonTabs, _extends({
    onIonTabsWillChange: event => {
      setCurrentTab(event.detail.tab);
    },
    onIonTabsDidChange: props.onTabsDidChange
  }, props), props.tabs.map(tab => /*#__PURE__*/React.createElement(AppTabButton, {
    style: currentTab === tab.path ? {
      "--color": "var(--ion-color-" + props.selectedColor || "primary"
    } : {},
    tab: tab.path
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: tab.icon
  }), /*#__PURE__*/React.createElement(AppLabel, null, tab.title), tab.notifications && /*#__PURE__*/React.createElement(AppBadge, {
    color: tab.notificationColor
  }, tab.notifications))), /*#__PURE__*/React.createElement(AppRouterOutlet, {
    id: v4(),
    root: {
      icon: "",
      path: "*",
      title: "",
      nested: [],
      component: () => /*#__PURE__*/React.createElement(React.Fragment, null, tabs[currentTab].component || /*#__PURE__*/React.createElement(React.Fragment, null, currentTab, " is missing a component! "))
    }
  }));
};

export default AppTabs;