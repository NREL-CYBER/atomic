import { IonBreadcrumb, IonBreadcrumbs, IonIcon, IonRouterLink } from '@ionic/react';
import { AppGrid } from "../..";
import { homeOutline, searchOutline } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { AppButton, AppButtons, AppChip, AppIcon, AppMenuButton, AppRow, AppTitle, AppToolbar } from '..';
import { useCompletion } from "../../hooks";
import useAppLayout from "../../hooks/useAppLayout";
import { useAppSettings } from "../../hooks/useAppSettings";
import useMediaQuery from "../../hooks/useMediaQuery";
import useTitle from "../../hooks/usePageTitle";
import AppModal from "../AppModal";
import AppSearchBar from "../AppSearchBar";
/**
 * Self aware top toolbar
 */

const AppTopToolbar = ({
  children,
  config
}) => {
  var _config$topBar, _config$topBar2, _config$topBar3, _config$topBar4;

  const {
    about,
    search,
    topBar
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
  const hideAbout = typeof about === "undefined";
  useEffect(() => {
    const listener = e => {
      var _searchBar$current;

      if (!((_searchBar$current = searchBar.current) !== null && _searchBar$current !== void 0 && _searchBar$current.contains(e.target))) {
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
  console.log(topBar);
  const isDesktop = useMediaQuery("only screen and (min-width: 500px)");
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppToolbar, {
    color: bgColor
  }, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "start"
  }, /*#__PURE__*/React.createElement(AppMenuButton, null), (_config$topBar = config.topBar) === null || _config$topBar === void 0 ? void 0 : _config$topBar.start, /*#__PURE__*/React.createElement(AppButton, {
    expand: "full",
    routerLink: "/"
  }, /*#__PURE__*/React.createElement(AppTitle, {
    color: isHome ? titleColor : undefined
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: (_config$topBar2 = config.topBar) !== null && _config$topBar2 !== void 0 && _config$topBar2.homeIcon ? (_config$topBar3 = config.topBar) === null || _config$topBar3 === void 0 ? void 0 : _config$topBar3.homeIcon : homeOutline
  }), " ")), /*#__PURE__*/React.createElement(IonBreadcrumbs, null, !isHome && breadcrumbs.map(breadCrumb => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(IonRouterLink, {
    routerLink: breadCrumb.path
  }, /*#__PURE__*/React.createElement(IonBreadcrumb, null, /*#__PURE__*/React.createElement(IonIcon, {
    slot: "start",
    icon: breadCrumb.icon
  }), breadCrumb.title))))), children), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, (_config$topBar4 = config.topBar) === null || _config$topBar4 === void 0 ? void 0 : _config$topBar4.end, !hideAbout && /*#__PURE__*/React.createElement(AppModal, {
    smol: true,
    title: appTitle + " (" + version + ")",
    onDismiss: () => {
      setShowAbout(false);
    },
    isOpen: showAbout
  }, /*#__PURE__*/React.createElement(AppGrid, null, /*#__PURE__*/React.createElement(AppRow, null, about === null || about === void 0 ? void 0 : about.component))), !hideAbout && /*#__PURE__*/React.createElement(AppButton, {
    fill: "clear",
    onClick: () => {
      setShowAbout(x => !x);
    }
  }, /*#__PURE__*/React.createElement(AppTitle, {
    color: titleColor
  }, appTitle, /*#__PURE__*/React.createElement(AppChip, {
    color: titleColor
  }, version))), search && !showSearch && /*#__PURE__*/React.createElement(AppButton, {
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
    focus: showSearch,
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