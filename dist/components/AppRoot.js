function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonApp, IonFooter } from '@ionic/react';
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
import React, { memo, useEffect } from 'react';
import { Route } from 'react-router';
import { AppContent } from '.';
import { useAppLayout } from '../hooks';
import "../theme/variables.css";
import AppChip from './AppChip';
import AppLogin from './AppLogin';
import AppRouter from './AppRouter';
import AppTitle from './AppTitle';
import AppCompletionToolbar from './global/AppCompletionToolbar';
import AppMainMenu from './global/AppMainMenu';
import AppNotifications from './global/AppNotifications';
import AppTopToolbar from './global/AppTopToolbar';
import AppGuidance from './guidance/AppGuidance'; //import AppCloudSerializer from './serialization/AppCloudSerializer';

import AppLocalSerializer from './serialization/AppLocalSerializer';
import AppRestSerializer from './serialization/AppRestSerializer';
import useAppAccount from '../hooks/useAppAccount';
/**
 * Component that stores the root of the application and control current theme
 */

const AppRoot = config => {
  const {
    routes,
    sections,
    bottomBar,
    topBar,
    children,
    serialization,
    title,
    version,
    cache
  } = config;
  const {
    initialize,
    darkMode,
    setDarkMode
  } = useAppLayout();
  const initializeAccounts = useAppAccount(x => x.initialize);
  useEffect(() => {
    config.darkMode && setDarkMode(config.darkMode);
  }, [config.darkMode, setDarkMode]);
  useEffect(() => {
    const className = darkMode ? 'dark-theme' : "light-theme";
    const oldClassName = darkMode ? 'light-theme' : "dark-theme";
    const element = window.document.body;
    element.classList.remove(oldClassName);
    element.classList.add(className);
  }, [darkMode]);
  useEffect(() => {
    config && initialize(config);
    config && initializeAccounts(config);
    return () => {
      console.log("Exit");
    };
  }, [config, initialize, initializeAccounts]);
  const {
    uid,
    setUid
  } = useAppAccount();
  const restSerializationAndNotLoggedIn = serialization && serialization.rest && serialization.rest && !uid;
  const localSerializationWithEncryptionAndNotLoggedIn = !uid && serialization && serialization.encryption === "RSA";
  const needs_authentication = restSerializationAndNotLoggedIn || localSerializationWithEncryptionAndNotLoggedIn;

  if (needs_authentication && serialization && serialization.rest && typeof uid === "undefined") {
    return /*#__PURE__*/React.createElement(IonApp, {
      className: darkMode ? "dark-theme" : "light-theme"
    }, /*#__PURE__*/React.createElement(AppContent, {
      center: true
    }, /*#__PURE__*/React.createElement(AppNotifications, null), /*#__PURE__*/React.createElement(AppTitle, {
      color: "tertiary"
    }, title, /*#__PURE__*/React.createElement(AppChip, {
      color: "primary"
    }, version)), /*#__PURE__*/React.createElement(AppLogin, {
      serialization: config.serialization,
      authenticate: (username, password, operation, onAuthenticate) => {
        return new Promise(resolve => {
          onAuthenticate("");
          resolve("");
        });
      },
      onLoginSuccess: uidCredential => {
        setUid(uidCredential);
      }
    })));
  }

  return /*#__PURE__*/React.createElement(IonApp, {
    className: darkMode ? "dark-theme" : "light-theme"
  }, serialization && serialization.mode === "local" && /*#__PURE__*/React.createElement(AppLocalSerializer, {
    serialization: serialization,
    cache: cache
  }), serialization && serialization.mode === "rest" && serialization.rest && /*#__PURE__*/React.createElement(AppRestSerializer, {
    serialization: serialization,
    cache: cache
  }), /*#__PURE__*/React.createElement(AppRouter, {
    id: "root"
  }, sections && /*#__PURE__*/React.createElement(AppMainMenu, {
    sections: sections
  }), topBar ? {
    topBar
  } : /*#__PURE__*/React.createElement(AppTopToolbar, {
    about: config.about || ""
  }), routes && routes.map(route => /*#__PURE__*/React.createElement(Route, _extends({
    key: route.path
  }, route))), /*#__PURE__*/React.createElement(AppNotifications, null), /*#__PURE__*/React.createElement(AppGuidance, null), /*#__PURE__*/React.createElement(IonFooter, null, /*#__PURE__*/React.createElement(AppCompletionToolbar, _extends({
    completion: config.completion
  }, bottomBar))), children));
};

export default /*#__PURE__*/memo(AppRoot);