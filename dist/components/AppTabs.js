function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { AppBadge, AppIcon, AppLabel } from './';
import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { AppCard } from '.';
import { useAppSettings } from '../hooks/useAppSettings';

/**
 * Component to display text with optional color
 */
const AppTabs = props => {
  const {
    selectedTab,
    ...otherProps
  } = props;
  const [currentTab, setCurrentTab] = useState(selectedTab);
  const [tabs] = useState(props.tabs.map(t => ({
    [t.path]: t
  })).reduce((a, b) => ({ ...a,
    ...b
  }), {}));
  const {
    darkMode
  } = useAppSettings();
  return /*#__PURE__*/React.createElement(AppCard, {
    headerColor: "clear",
    contentColor: "clear"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: props.height,
      maxHeight: props.height
    }
  }, /*#__PURE__*/React.createElement(IonTabs, _extends({
    className: darkMode ? "dark-theme" : "light-theme",
    onIonTabsWillChange: event => {
      setCurrentTab(event.detail.tab);
    },
    onIonTabsDidChange: props.onTabsDidChange
  }, otherProps), /*#__PURE__*/React.createElement(IonTabBar, {
    slot: props.slot || "top"
  }, props.tabs.map((tab, i) => /*#__PURE__*/React.createElement(IonTabButton, {
    key: i,
    style: currentTab === tab.path ? {
      "--color": "var(--ion-color-" + props.selectedColor || "primary"
    } : {},
    tab: tab.path
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: tab.icon
  }), /*#__PURE__*/React.createElement(AppLabel, null, tab.title), tab.notifications && /*#__PURE__*/React.createElement(AppBadge, {
    color: tab.notificationColor
  }, tab.notifications)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(IonRouterOutlet, null, /*#__PURE__*/React.createElement(Route, {
    path: "*",
    component: tabs[currentTab].component
  }))))));
};

export default AppTabs;