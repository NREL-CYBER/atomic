function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
import React, { useEffect, memo } from 'react';
import { Route } from 'react-router';
import { useAppLayout } from '../hooks';
import "../theme/variables.css";
import AppRouter from './AppRouter';
import AppBottomToolbar from './global/AppCompletionToolbar';
import AppMainMenu from './global/AppMainMenu';
import AppTopToolbar from './global/AppTopToolbar';
import useDarkMode from '../hooks/useDarkMode';
/**
 * Component that stores the root of the application and control current theme
 */

const AppRoot = ({
  routes,
  sections,
  bottomBar,
  topBar,
  darkMode,
  children
}) => {
  const {
    initialize
  } = useAppLayout();
  useDarkMode(darkMode ? darkMode : false);
  useEffect(() => {
    initialize(routes);
  }, [initialize, routes]);
  return /*#__PURE__*/React.createElement(IonApp, {
    className: darkMode ? "dark-theme" : "light-theme"
  }, /*#__PURE__*/React.createElement(AppRouter, {
    id: "root"
  }, sections && /*#__PURE__*/React.createElement(AppMainMenu, {
    sections: sections
  }), topBar ? {
    topBar
  } : /*#__PURE__*/React.createElement(AppTopToolbar, null), children, routes.map(route => /*#__PURE__*/React.createElement(Route, _extends({
    key: route.path
  }, route))), bottomBar ? bottomBar : /*#__PURE__*/React.createElement(AppBottomToolbar, null)));
};

export default memo(AppRoot);