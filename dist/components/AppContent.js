import { IonCol, IonContent, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
/**
 * Component that allows for contents to be scrollable
 * We'll customize the scrollbar here later.
 */

const AppContent = props => /*#__PURE__*/React.createElement(IonContent, null, /*#__PURE__*/React.createElement(IonGrid, null, /*#__PURE__*/React.createElement(IonRow, null, /*#__PURE__*/React.createElement(IonCol, {
  sizeSm: "0",
  sizeXs: "0",
  sizeMd: '3'
}), /*#__PURE__*/React.createElement(IonCol, {
  sizeSm: "12",
  sizeXs: "12",
  sizeMd: "6"
}, props.children))));

export default AppContent;