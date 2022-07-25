import { IonRouterOutlet } from '@ionic/react';
import React from 'react';
import { Route } from 'react-router';

/**
 * 
 * flatten all nested routes for a single router 
 */
export const MapRoutes = ({
  routes
}) => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, routes.map(route => /*#__PURE__*/React.createElement(React.Fragment, {
    key: route.path
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Route, route)), route.nested && /*#__PURE__*/React.createElement(MapRoutes, {
    routes: route.nested
  }))));
};
/**
 * Component That contains accepts a root route with optional nested routes
 * this is how side menus and pages get their own routing
 */

export const AppRouterOutlet = ({
  root,
  id
}) => /*#__PURE__*/React.createElement(IonRouterOutlet, {
  id: id
}, root.nested ? /*#__PURE__*/React.createElement(MapRoutes, {
  routes: root.nested
}) : /*#__PURE__*/React.createElement(React.Fragment, null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Route, root)));
export default AppRouterOutlet;