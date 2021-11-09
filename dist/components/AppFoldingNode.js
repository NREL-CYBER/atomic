/* eslint-disable no-script-url */
import { AppButtons, AppCol, AppGrid, AppIcon, AppItem, AppRow, AppTitle } from ".";
import { chevronDownOutline, chevronForwardOutline } from "ionicons/icons";
import React, { useState } from "react";

/**
 * A simple folding node for show-hide content & composing tree views naturally
 * TODO: We should make these sizes based off column setting & add that to app config
 * */
const AppFoldingNode = ({
  centerContent,
  children,
  title,
  color,
  endContent,
  hideIcon,
  titleText,
  folded
}) => {
  const [isFolded, setFolded] = useState(typeof folded !== "undefined" ? folded : true);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppItem, {
    onClick: () => {
      setFolded(x => !x);
    }
  }, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "start"
  }, !hideIcon && /*#__PURE__*/React.createElement(AppIcon, {
    color: color,
    icon: isFolded ? chevronForwardOutline : chevronDownOutline
  }), titleText ? /*#__PURE__*/React.createElement(AppTitle, {
    color: color
  }, " ", title) : title), centerContent && centerContent, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, endContent && endContent)), !isFolded && /*#__PURE__*/React.createElement(AppGrid, null, /*#__PURE__*/React.createElement(AppRow, null, /*#__PURE__*/React.createElement(AppCol, {
    size: "1"
  }), /*#__PURE__*/React.createElement(AppCol, {
    size: "23"
  }, children))));
};

export default AppFoldingNode;