import { IonApp } from '@ionic/react';
/* Core CSS required for Ionic components to work properly */

import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
/* Basic CSS for apps built with Ionic */

import "@ionic/react/css/normalize.css";
/* Optional CSS utils that can be commented out */

import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import React, { useEffect } from 'react';
import { useAppLayout } from '../hooks';
import "../theme/variables.css";
import AppRouter from './AppRouter';
import AppRouterOutlet from './AppRouterOutlet';
import AppBottomToolbar from './global/AppBottomToolbar';
import AppMainMenu from './global/AppMainMenu';
import AppTopToolbar from './global/AppTopToolbar';
/**
 * Component that stores the root of the application and control current theme
 */

const AppRoot = ({
  rootRoute,
  sections,
  bottomBar,
  topBar,
  children
}) => {
  const initLayout = useAppLayout(x => x.initialize);
  useEffect(() => {
    initLayout(rootRoute);
  }, [initLayout, rootRoute]);
  return /*#__PURE__*/React.createElement(IonApp, {
    className: "dark-theme"
  }, /*#__PURE__*/React.createElement(AppRouter, {
    id: "root"
  }, topBar ? {
    topBar
  } : /*#__PURE__*/React.createElement(AppTopToolbar, null), sections && /*#__PURE__*/React.createElement(AppMainMenu, {
    sections: sections
  }), /*#__PURE__*/React.createElement(AppRouterOutlet, {
    id: "root",
    root: rootRoute
  }), bottomBar ? bottomBar : /*#__PURE__*/React.createElement(AppBottomToolbar, null)));
};

export default AppRoot;