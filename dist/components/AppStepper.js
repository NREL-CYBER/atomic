function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import useAppLayout from '../hooks/useAppLayout';
import useCompletion from '../hooks/useCompletion';
import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { AppButton, AppRow } from '.';
import AppGrid from './AppGrid';
import { MapRoutes } from './AppRouterOutlet';
import AppToolbar from './AppToolbar';

const StepButton = step => {
  const {
    pathStatusColor,
    isUnlocked
  } = useCompletion();
  const currentPath = useAppLayout(x => x.path);
  const statusColor = pathStatusColor(step.path);
  return /*#__PURE__*/React.createElement(AppButton, {
    color: currentPath == step.path ? "tertiary" : undefined,
    fill: "clear",
    disabled: !isUnlocked(step.path),
    routerLink: step.path
  }, /*#__PURE__*/React.createElement(IonIcon, {
    color: statusColor,
    icon: step.icon
  }), /*#__PURE__*/React.createElement(IonLabel, {
    color: statusColor
  }, step.title));
};
/**
 * Component show a spinner while something is loading
 */


const AppStepper = route => {
  const {
    nested
  } = route;
  const history = useHistory();
  const location = useLocation();
  if (nested && !nested.map(p => p.path).includes(location.pathname)) history.push({
    pathname: nested[0].path
  });
  return /*#__PURE__*/React.createElement(AppGrid, null, /*#__PURE__*/React.createElement(AppRow, null, /*#__PURE__*/React.createElement(AppToolbar, {
    color: "light"
  }, nested && nested.map(step => {
    return /*#__PURE__*/React.createElement(StepButton, _extends({
      key: step.path
    }, step));
  })), nested && /*#__PURE__*/React.createElement(IonRouterOutlet, null, /*#__PURE__*/React.createElement(MapRoutes, {
    routes: nested
  }))), /*#__PURE__*/React.createElement(AppRow, null));
};

export default AppStepper;