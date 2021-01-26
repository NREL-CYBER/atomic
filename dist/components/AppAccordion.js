import React, { useState } from "react";
import { AppItem } from ".";
import AppList from "./AppList";

/**
 * 
 * @param accordionOptions items:[]accordionItem[], 
 */
const AppAccordion = ({
  items,
  itemColor,
  selectedColor,
  expand
}) => {
  const [unlockedIndex, setUnlockedIndex] = useState(-1);
  return /*#__PURE__*/React.createElement(AppList, null, items.map((accordionItem, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement(AppItem, {
    color: unlockedIndex === i ? selectedColor : itemColor,
    onClick: () => {
      if (unlockedIndex === i) {
        setUnlockedIndex(-1);
      } else {
        setUnlockedIndex(i);
      }
    }
  }, /*#__PURE__*/React.createElement(accordionItem.toolbarContent, null)), (unlockedIndex === i || expand) && /*#__PURE__*/React.createElement(AppItem, {
    lines: "none",
    className: "accordion-item"
  }, /*#__PURE__*/React.createElement(accordionItem.innerContent, null)))));
};

export default AppAccordion;