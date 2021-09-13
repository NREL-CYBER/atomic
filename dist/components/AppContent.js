import { IonCol, IonContent, IonGrid, IonRow } from '@ionic/react';
import React, { useLayoutEffect, useRef } from 'react';
import { AppToolbar } from '.';
import { AppNextButton } from './global/AppNextButton';
/**
 * Component that allows for contents to be scrollable
 * We'll customize the scrollbar here later.
 */

const AppContent = props => {
  const contentRef = useRef(null);
  useLayoutEffect(() => {
    const styles = document.createElement('style');
    styles.textContent = `
          ::-webkit-scrollbar {
            width: 9px;
          }
      
          /* Track */
          ::-webkit-scrollbar-track {
            border-radius: 5px;
          }
      
          /* Handle */
          ::-webkit-scrollbar-thumb {
            background: rgb(80,80,80); 
            border-radius: 10px;
            padding-right:3px;
          }
      
          /* Handle on hover */
          ::-webkit-scrollbar-thumb:hover {
            background: #b30000; 
          }
        `;
    contentRef.current?.shadowRoot?.appendChild(styles);
  }, [contentRef.current?.shadowRoot, contentRef]);
  return props.center ? /*#__PURE__*/React.createElement(IonContent, {
    ref: contentRef
  }, /*#__PURE__*/React.createElement(IonGrid, null, /*#__PURE__*/React.createElement(IonRow, null, /*#__PURE__*/React.createElement(IonCol, {
    sizeSm: "1",
    sizeXs: "0",
    sizeMd: '4'
  }), /*#__PURE__*/React.createElement(IonCol, {
    sizeSm: "22",
    sizeXs: "24",
    sizeMd: "16"
  }, props.children, props.next && /*#__PURE__*/React.createElement(AppToolbar, null, /*#__PURE__*/React.createElement(AppNextButton, null)))))) : /*#__PURE__*/React.createElement(IonContent, {
    ref: contentRef
  }, props.children, props.next && /*#__PURE__*/React.createElement(AppToolbar, null, /*#__PURE__*/React.createElement(AppNextButton, null)));
};

export default AppContent;