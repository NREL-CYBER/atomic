function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonApp, IonCol, IonContent, IonFooter, IonGrid, IonRow } from '@ionic/react';
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
import { AppContent, AppSerializer } from '.';
import { useAppLayout } from '../hooks';
import useAppAccount from '../hooks/useAppAccount';
import { useAppSettings } from '../hooks/useAppSettings';
import useCache from '../hooks/useCache';
import useIndexDBStorage from '../hooks/useLocalSerialization';
import { useRestSerializeation } from '../hooks/useRestSerialization';
import "../theme/variables.css";
import { prettyTitle } from '../util';
import AppChip from './AppChip';
import AppLoadingCard from './AppLoadingCard';
import AppLogin from './AppLogin';
import AppPage from './AppPage';
import AppRouter from './AppRouter';
import AppTitle from './AppTitle';
import AppToolbar from './AppToolbar';
import AppCompletion from './completion/AppCompletion';
import { AppBottomBar } from './global/AppBottomBar';
import AppMainMenu, { AppFixedMainMenu } from './global/AppMainMenu';
import AppNotifications from './global/AppNotifications';
import AppTopToolbar from './global/AppTopToolbar';
/**
 * Component that stores the root of the application and control current theme
 */

const AppRoot = config => {
  const {
    routes,
    mainMenu,
    topBar,
    bottomBar,
    children,
    serialization,
    title,
    version,
    cache
  } = config;
  const {
    sections
  } = mainMenu || {
    sections: {}
  };
  const {
    initialize,
    status
  } = useAppLayout();
  const {
    darkMode
  } = useAppSettings();
  const initializeAccounts = useAppAccount(x => x.initialize);
  const initializeSettings = useAppSettings(x => x.initialize);
  const {
    ready
  } = useCache();
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
    config && initializeSettings(config);
    typeof cache === "undefined" && ready();
    return () => {
      console.log("Exit");
    };
  }, [cache, config, initialize, initializeAccounts, initializeSettings, ready]);
  const {
    uid,
    setUid
  } = useAppAccount();
  const restSerializationAndNotLoggedIn = serialization && serialization.rest && serialization.rest && !uid;
  const localSerializationWithEncryptionAndNotLoggedIn = !uid && serialization && serialization.encryption === "AES256";
  const needs_authentication = restSerializationAndNotLoggedIn || localSerializationWithEncryptionAndNotLoggedIn;
  const {
    endpoint,
    serverStatus
  } = useAppSettings();
  const customizedSerialization = typeof endpoint !== "undefined" && { ...serialization,
    mode: "rest",
    rest: {
      endpoint
    }
  };

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

  const fixedMainMenu = typeof mainMenu?.fixed !== "undefined" && mainMenu.fixed;
  return /*#__PURE__*/React.createElement(IonApp, {
    className: darkMode ? "dark-theme" : "light-theme"
  }, serverStatus !== "connected" && cache && /*#__PURE__*/React.createElement(AppSerializer, {
    context: useIndexDBStorage,
    uid: uid,
    serialization: serialization,
    cache: cache
  }), customizedSerialization && cache && /*#__PURE__*/React.createElement(AppSerializer, {
    context: useRestSerializeation,
    uid: uid,
    serialization: customizedSerialization,
    cache: cache
  }), status === "synchronizing" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppToolbar, null), /*#__PURE__*/React.createElement(AppPage, {
    fullscreen: true,
    id: "loading"
  }, /*#__PURE__*/React.createElement(AppLoadingCard, {
    color: "tertiary",
    title: prettyTitle(status),
    message: ""
  }))), status === "idle" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppRouter, {
    animated: config.animated,
    id: "root"
  }, /*#__PURE__*/React.createElement(AppCompletion, {
    config: config
  }), topBar ? {
    topBar
  } : /*#__PURE__*/React.createElement(AppTopToolbar, {
    config: config
  }), fixedMainMenu ? /*#__PURE__*/React.createElement(IonContent, {
    style: {
      height: "100%"
    }
  }, "  ", /*#__PURE__*/React.createElement(IonGrid, {
    style: {
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement(IonRow, {
    style: {
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement(IonCol, {
    size: "4"
  }, sections && /*#__PURE__*/React.createElement(AppFixedMainMenu, {
    sections: sections
  })), /*#__PURE__*/React.createElement(IonCol, {
    size: "20"
  }, routes.map(route => /*#__PURE__*/React.createElement(Route, _extends({
    key: route.path
  }, route)))))), " ") : /*#__PURE__*/React.createElement(IonContent, {
    style: {
      height: "100%"
    }
  }, sections && /*#__PURE__*/React.createElement(AppMainMenu, {
    sections: sections
  }), routes.map(route => /*#__PURE__*/React.createElement(Route, _extends({
    key: route.path
  }, route)))), bottomBar && /*#__PURE__*/React.createElement(IonFooter, null, /*#__PURE__*/React.createElement(AppBottomBar, {
    config: config
  })), children)));
};

export default /*#__PURE__*/memo(AppRoot);