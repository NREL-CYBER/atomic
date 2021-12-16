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
  return /*#__PURE__*/React.createElement(IonAccordionGroup, null, items.map((accordionItem, i) =>
  /*#__PURE__*/
  // eslint-disable-next-line no-script-url
  React.createElement(IonAccordion, {
    value: i.toString()
  }, /*#__PURE__*/React.createElement(IonItem, {
    slot: "header"
  }, accordionItem.toolbarContent), /*#__PURE__*/React.createElement(IonList, {
    slot: "content"
  }, accordionItem.innerContent))));
};

export default AppAccordion;