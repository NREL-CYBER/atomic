import { homeOutline, searchOutline } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { AppButton, AppButtons, AppCard, AppChip, AppIcon, AppMenuButton, AppTitle, AppToolbar } from '..';
import { useCompletion } from '../../hooks';
import useAppLayout from '../../hooks/useAppLayout';
import { useAppSettings } from '../../hooks/useAppSettings';
import useTitle from '../../hooks/useAppTitle';
import AppItemDivider from '../AppItemDivider';
import AppModal from '../AppModal';
import AppSearchBar from '../AppSearchBar';
/**
 * Self aware top toolbar
 */

const AppTopToolbar = ({
  children,
  config
}) => {
  const {
    about,
    search
  } = config;
  const [query, setQuery] = useState("");
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
  const {
    darkMode
  } = useAppSettings();
  const breadcrumbs = useAppLayout(x => x.breadCrumbs);
  const allRoutes = useAppLayout(x => x.allRoutesFlattened);
  const isHome = pathname === '/';
  const {
    title,
    setTitle
  } = useTitle();
  useEffect(() => {
    update(pathname);

    if (allRoutes.map(x => x.path).includes(pathname)) {
      setTitle(undefined);
    }
  }, [pathname, update, paths, setTitle, allRoutes]);
  const [showAbout, setShowAbout] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const titleColor = darkMode ? "tertiary" : "secondary";
  const bgColor = darkMode ? "paper" : "tertiary";
  const searchBar = useRef(null);
  useEffect(() => {
    const listener = e => {
      if (!searchBar.current?.contains(e.target)) {
        setShowSearch(false);
        setQuery("");
      }

      ;
    };

    if (showSearch) {
      window.addEventListener("mousedown", listener);
    } else {
      window.removeEventListener("mousedown", listener);
    }
  }, [showSearch]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppToolbar, {
    color: bgColor
  }, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "start"
  }, /*#__PURE__*/React.createElement(AppMenuButton, null), /*#__PURE__*/React.createElement(AppButton, {
    expand: "full",
    routerLink: "/"
  }, /*#__PURE__*/React.createElement(AppTitle, {
    color: isHome ? titleColor : undefined
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: homeOutline
  }), " ")), !isHome && breadcrumbs.map(breadCrumb => /*#__PURE__*/React.createElement(AppButton, {
    key: breadCrumb.path,
    color: breadCrumb.path === pathname ? "tertiary" : undefined,
    fill: breadCrumb.path === pathname ? "solid" : "clear",
    routerLink: breadCrumb.path
  }, /*#__PURE__*/React.createElement(AppTitle, null, breadCrumb.title, " "), "  ", /*#__PURE__*/React.createElement(AppIcon, {
    icon: breadCrumb.icon
  }))), title && /*#__PURE__*/React.createElement(AppButton, {
    color: "tertiary",
    fill: "solid"
  }, /*#__PURE__*/React.createElement(AppTitle, null, title)), children), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, /*#__PURE__*/React.createElement(AppModal, {
    onDismiss: () => {
      setShowAbout(false);
    },
    isOpen: showAbout
  }, /*#__PURE__*/React.createElement(AppCard, {
    contentColor: "light",
    headerColor: bgColor,
    titleColor: titleColor,
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
    fill: "clear",
    onClick: () => {
      setShowAbout(x => !x);
    }
  }, /*#__PURE__*/React.createElement(AppTitle, {
    color: titleColor
  }, appTitle, /*#__PURE__*/React.createElement(AppChip, {
    color: titleColor
  }, version))), search && /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => {
      setShowSearch(x => !x);
    }
  }, /*#__PURE__*/React.createElement(AppTitle, null, /*#__PURE__*/React.createElement(AppIcon, {
    color: showSearch ? "primary" : "medium",
    icon: searchOutline
  }))))), showSearch && /*#__PURE__*/React.createElement("div", {
    ref: searchBar,
    id: "searchbar",
    style: {
      position: "absolute",
      top: 50,
      left: 0,
      right: 0,
      height: 60,
      zIndex: 1000
    }
  }, /*#__PURE__*/React.createElement(AppToolbar, {
    color: "paper"
  }, /*#__PURE__*/React.createElement(AppSearchBar, {
    onQuery: q => {
      setQuery(q);
    }
  })), query && config.search && /*#__PURE__*/React.createElement(config.search, {
    query: query,
    dismiss: () => {
      setQuery("");
      setShowSearch(false);
    }
  })));
};

export default AppTopToolbar;