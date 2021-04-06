import useAppLayout from '../../hooks/useAppLayout';
import { homeOutline, closeOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { AppButton, AppButtons, AppIcon, AppMenuButton, AppTitle, AppToolbar, AppChip, AppCard } from '..';
import { useCompletion } from '../../hooks';
import AppModal from '../AppModal';
import AppContent from '../AppContent';
/**
 * Self aware top toolbar
 */

const AppTopToolbar = ({
  children,
  about
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
  const [showAbout, setShowAbout] = useState(false);
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
    fill: breadCrumb.path === pathname ? "solid" : "clear",
    routerLink: breadCrumb.path
  }, /*#__PURE__*/React.createElement(AppTitle, null, breadCrumb.title, " "), "  ", /*#__PURE__*/React.createElement(AppIcon, {
    icon: breadCrumb.icon
  }))), children), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, /*#__PURE__*/React.createElement(AppButton, {
    color: "tertiary",
    fill: "clear",
    onClick: () => {
      setShowAbout(x => !x);
    }
  }, /*#__PURE__*/React.createElement(AppModal, {
    onDismiss: () => {
      setShowAbout(false);
    },
    isOpen: showAbout
  }, /*#__PURE__*/React.createElement(AppContent, null, /*#__PURE__*/React.createElement(AppCard, {
    contentColor: "light",
    headerColor: "tertiary",
    title: appTitle + " " + version
  }, showAbout && about), /*#__PURE__*/React.createElement(AppButton, {
    expand: "full",
    fill: "outline",
    onClick: () => setShowAbout(false)
  }, "OK "))), /*#__PURE__*/React.createElement(AppTitle, {
    color: "tertiary"
  }, appTitle, /*#__PURE__*/React.createElement(AppChip, {
    color: "tertiary"
  }, version))), /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => {
      window.close();
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: closeOutline
  }))));
};

export default AppTopToolbar;