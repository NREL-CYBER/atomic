import useAppLayout from '../../hooks/useAppLayout';
import { homeOutline } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { AppButton, AppButtons, AppIcon, AppMenuButton, AppTitle, AppToolbar, AppChip } from '..';
import { useCompletion } from '../../hooks';
/**
 * Self aware top toolbar
 */

const AppTopToolbar = ({
  children
}) => {
  const {
    pathname
  } = useLocation();
  const {
    paths
  } = useCompletion();
  const {
    update,
    appTitle,
    version
  } = useAppLayout();
  const breadcrumbs = useAppLayout(x => x.breadCrumbs);
  const isHome = pathname === '/';
  useEffect(() => {
    update(pathname);
  }, [pathname, update, paths]);
  return /*#__PURE__*/React.createElement(AppToolbar, null, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "start"
  }, /*#__PURE__*/React.createElement(AppMenuButton, null), /*#__PURE__*/React.createElement(AppButton, {
    expand: "full",
    routerLink: "/"
  }, /*#__PURE__*/React.createElement(AppTitle, {
    color: isHome ? "tertiary" : undefined
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: homeOutline
  }), " ")), !isHome && breadcrumbs.map(breadCrumb => /*#__PURE__*/React.createElement(AppButton, {
    key: breadCrumb.path,
    color: breadCrumb.path === pathname ? "tertiary" : undefined,
    fill: breadCrumb.path === pathname ? "outline" : "clear",
    routerLink: breadCrumb.path
  }, /*#__PURE__*/React.createElement(AppTitle, {
    color: breadCrumb.path === pathname ? "tertiary" : "dark"
  }, breadCrumb.title, " "), "  ", /*#__PURE__*/React.createElement(AppIcon, {
    icon: breadCrumb.icon
  }))), children), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, /*#__PURE__*/React.createElement(AppTitle, {
    color: "tertiary"
  }, appTitle, /*#__PURE__*/React.createElement(AppChip, {
    color: "primary"
  }, version))));
};

export default AppTopToolbar;