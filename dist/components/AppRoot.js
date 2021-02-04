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
import React, { useEffect, memo, useState } from 'react';
import { Route } from 'react-router';
import { useAppLayout } from '../hooks';
import "../theme/variables.css";
import AppRouter from './AppRouter';
import AppBottomToolbar from './global/AppCompletionToolbar';
import AppMainMenu from './global/AppMainMenu';
import AppTopToolbar from './global/AppTopToolbar';
import useDarkMode from '../hooks/useDarkMode';
import AppSerializer from './serialization/AppLocalSerializer';
import AppNotifications from './global/AppNotifications';
import AppCloudSerializer from './serialization/AppCloudSerializer';
import { AppPage, AppContent } from '.';
import AppLogin from './AppLogin';
import AppGuidance from './guidance/AppGuidance';
import AppTitle from './AppTitle';
import AppChip from './AppChip';
/**
 * Component that stores the root of the application and control current theme
 */

const AppRoot = ({
  routes,
  sections,
  bottomBar,
  topBar,
  darkMode,
  children,
  serialization,
  cache,
  title,
  version
}) => {
  const {
    initialize
  } = useAppLayout();
  useDarkMode(darkMode ? darkMode : false);
  useEffect(() => {
    initialize(routes);
  }, [initialize, routes]);
  const [uid, setUid] = useState();
  const needs_authentication = serialization && serialization.cloud && serialization.cloud.provider.authentication.required && !uid;

  if (needs_authentication && serialization && serialization.cloud && typeof uid === "undefined") {
    return /*#__PURE__*/React.createElement(IonApp, {
      className: darkMode ? "dark-theme" : "light-theme"
    }, /*#__PURE__*/React.createElement(AppPage, null, /*#__PURE__*/React.createElement(AppContent, {
      center: true
    }, /*#__PURE__*/React.createElement(AppTitle, {
      color: "tertiary"
    }, title, /*#__PURE__*/React.createElement(AppChip, {
      color: "primary"
    }, version)), /*#__PURE__*/React.createElement(AppLogin, {
      cloud: serialization.cloud,
      onLoginSuccess: uidCredential => {
        setUid(uidCredential);
      }
    }))));
  }

  return /*#__PURE__*/React.createElement(IonApp, {
    className: darkMode ? "dark-theme" : "light-theme"
  }, serialization && serialization.mode === "local" && /*#__PURE__*/React.createElement(AppSerializer, {
    cache: cache
  }), serialization && serialization.mode === "cloud" && serialization.cloud && uid && /*#__PURE__*/React.createElement(AppCloudSerializer, {
    uid: uid,
    cloud: serialization.cloud,
    cache: cache
  }), /*#__PURE__*/React.createElement(AppRouter, {
    id: "root"
  }, sections && /*#__PURE__*/React.createElement(AppMainMenu, {
    sections: sections
  }), topBar ? {
    topBar
  } : /*#__PURE__*/React.createElement(AppTopToolbar, null), children, routes.map(route => /*#__PURE__*/React.createElement(Route, _extends({
    key: route.path
  }, route))), bottomBar ? bottomBar : /*#__PURE__*/React.createElement(AppBottomToolbar, null), /*#__PURE__*/React.createElement(AppNotifications, null), /*#__PURE__*/React.createElement(AppGuidance, null)));
};

export default memo(AppRoot);