import { IonSplitPane } from "@ionic/react";
import { AppContent } from "../entry.ts";
import { AppCard, AppList } from "../components";
import AppSubMenu from "../components/AppSubMenu";
import { submenuRoute } from "./routes";
export const ExampleSubMenu = () => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IonSplitPane, null, /*#__PURE__*/React.createElement(AppList, null, /*#__PURE__*/React.createElement(AppSubMenu, {
    pages: submenuRoute.nested
  })), /*#__PURE__*/React.createElement(AppContent, null, /*#__PURE__*/React.createElement(AppCard, null))));
};