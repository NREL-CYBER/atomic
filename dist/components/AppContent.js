import { IonCol, IonContent, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import { AppNextButton } from './global/AppNextButton';
/**
 * Component that allows for contents to be scrollable
 * We'll customize the scrollbar here later.
 */

const AppContent = props => props.center ? /*#__PURE__*/React.createElement(IonContent, null, /*#__PURE__*/React.createElement(IonGrid, null, /*#__PURE__*/React.createElement(IonRow, null, /*#__PURE__*/React.createElement(IonCol, {
  sizeSm: "0",
  sizeXs: "0",
  sizeMd: '2'
}), /*#__PURE__*/React.createElement(IonCol, {
  sizeSm: "12",
  sizeXs: "12",
  sizeMd: "8"
}, props.children, props.next && /*#__PURE__*/React.createElement(AppNextButton, null))))) : /*#__PURE__*/React.createElement(IonContent, null, props.children, props.next && /*#__PURE__*/React.createElement(AppNextButton, null));

export default AppContent;