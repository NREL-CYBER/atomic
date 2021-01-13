import useAppLayout from '../../hooks/useAppLayout';
import { homeOutline } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { AppButton, AppButtons, AppIcon, AppMenuButton, AppTitle, AppToolbar } from '..';
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
    update
  } = useAppLayout();
  const breadcrumbs = useAppLayout(x => x.breadCrumbs);
  useEffect(() => {
    update(pathname);
  }, [pathname, update]);
  return /*#__PURE__*/React.createElement(AppToolbar, null, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "start"
  }, /*#__PURE__*/React.createElement(AppMenuButton, null), /*#__PURE__*/React.createElement(AppButton, {
    expand: "full",
    routerLink: "/"
  }, /*#__PURE__*/React.createElement(AppTitle, {
    color: pathname === '/' ? "tertiary" : undefined
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: homeOutline
  }), " ")), breadcrumbs.map(breadCrumb => /*#__PURE__*/React.createElement(AppButton, {
    key: breadCrumb.path,
    color: breadCrumb.path === pathname ? "tertiary" : undefined,
    fill: breadCrumb.path === pathname ? "outline" : "clear",
    routerLink: breadCrumb.path
  }, /*#__PURE__*/React.createElement(AppTitle, {
    color: breadCrumb.path === pathname ? "tertiary" : "dark"
  }, breadCrumb.title, " "), "  ", /*#__PURE__*/React.createElement(AppIcon, {
    icon: breadCrumb.icon
  }))), children));
};

export default AppTopToolbar;