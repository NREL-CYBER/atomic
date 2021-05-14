import { closeOutline, homeOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { AppButton, AppButtons, AppCard, AppChip, AppIcon, AppMenuButton, AppTitle, AppToolbar } from '..';
import { useCompletion } from '../../hooks';
import useAppAccount from '../../hooks/useAppAccount';
import useAppLayout from '../../hooks/useAppLayout';
import AppItemDivider from '../AppItemDivider';
import AppModal from '../AppModal';
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
    version,
    darkMode
  } = useAppLayout();
  const breadcrumbs = useAppLayout(x => x.breadCrumbs);
  const isHome = pathname === '/';
  useEffect(() => {
    update(pathname);
  }, [pathname, update, paths]);
  const [showAbout, setShowAbout] = useState(false);
  const {
    setUid
  } = useAppAccount();
  return /*#__PURE__*/React.createElement(AppToolbar, {
    color: darkMode ? "paper" : "tertiary"
  }, /*#__PURE__*/React.createElement(AppButtons, {
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
  }, /*#__PURE__*/React.createElement(AppModal, {
    onDismiss: () => {
      setShowAbout(false);
    },
    isOpen: showAbout
  }, /*#__PURE__*/React.createElement(AppCard, {
    contentColor: "light",
    headerColor: "tertiary",
    title: appTitle + " " + version
  }, /*#__PURE__*/React.createElement(AppItemDivider, {
    color: "clear"
  }), about, /*#__PURE__*/React.createElement(AppItemDivider, {
    color: "clear"
  })), /*#__PURE__*/React.createElement(AppButton, {
    expand: "full",
    fill: "solid",
    onClick: () => {
      setShowAbout(false);
    }
  }, "OK ")), /*#__PURE__*/React.createElement(AppButton, {
    color: "tertiary",
    fill: "clear",
    onClick: () => {
      setShowAbout(x => !x);
    }
  }, /*#__PURE__*/React.createElement(AppTitle, {
    color: "tertiary"
  }, appTitle, /*#__PURE__*/React.createElement(AppChip, {
    color: "tertiary"
  }, version))), /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => {
      window.close();
      setUid(undefined);
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: closeOutline
  }))));
};

export default AppTopToolbar;