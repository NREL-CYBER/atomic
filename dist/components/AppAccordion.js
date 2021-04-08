import React, { useState } from "react";
import { AppItem, AppRow } from ".";
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
    href: "javascript:void(0)",
    color: unlockedIndex === i ? selectedColor : itemColor,
    onClick: () => {
      if (unlockedIndex === i) {
        setUnlockedIndex(-1);
      } else {
        setUnlockedIndex(i);
      }
    }
  }, accordionItem.toolbarContent), (unlockedIndex === i || expand) && /*#__PURE__*/React.createElement(AppRow, null, accordionItem.innerContent))));
};

export default AppAccordion;