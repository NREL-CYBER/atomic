import React from "react";
import ReactJson from "react-json-view";
export const AppJsonDisplay = ({
  customRenderMap,
  propertyInfo,
  value
}) => {
  const id = propertyInfo.$id || propertyInfo.$ref;

  if (id && customRenderMap && typeof customRenderMap[id] !== "undefined") {
    return customRenderMap[id](value);
  }

  const length = String(JSON.stringify(value)).length;
  const title = propertyInfo.title || propertyInfo.$ref || propertyInfo.$id || "";
  return /*#__PURE__*/React.createElement(ReactJson, {
    css: {
      backgroundColor: "clear"
    },
    theme: "ashes",
    enableClipboard: false,
    collapsed: JSON.stringify(value).length > 30,
    displayObjectSize: false,
    name: false,
    displayDataTypes: false,
    src: value
  });
};
export const VisualizeValue = AppJsonDisplay;