import { IonAccordion, IonAccordionGroup, IonItem, IonList } from "@ionic/react";
import React from "react";

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
  return /*#__PURE__*/React.createElement(IonAccordionGroup, {
    value: expand ? "0" : undefined
  }, items.map((accordionItem, i) => /*#__PURE__*/React.createElement(IonAccordion, {
    value: i.toString(),
    toggleIcon: typeof accordionItem.innerContent !== "undefined" ? "chevron-down" : "",
    disabled: typeof accordionItem.innerContent === "undefined"
  }, /*#__PURE__*/React.createElement(IonItem, {
    slot: "header"
  }, accordionItem.toolbarContent), /*#__PURE__*/React.createElement(IonList, {
    slot: "content"
  }, accordionItem.innerContent))));
};

export default AppAccordion;