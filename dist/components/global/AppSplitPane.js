/**
 * Next step button
 */
import { IonSplitPane } from "@ionic/react";
import React from "react";
export const AppSplitPane = ({
  contentId = "main",
  children
}) => {
  return /*#__PURE__*/React.createElement(IonSplitPane, {
    when: "xs",
    contentId: "root"
  }, children);
};