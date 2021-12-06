import { IonCol, IonContent, IonGrid, IonRow } from '@ionic/react';
import React, { useLayoutEffect, useRef } from 'react';
import { AppToolbar } from '.';
import { AppNextButton } from './global/AppNextButton';
export const ConentScrollBarStyle = `
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
  background: rgb(90,90,90); 
}
`;
/**
 * Component that allows for contents to be scrollable
 * We'll customize the scrollbar here later.
 */

const AppContent = props => {
  var _contentRef$current2;

  const contentRef = useRef(null);
  useLayoutEffect(() => {
    var _contentRef$current, _contentRef$current$s;

    const styles = document.createElement('style');
    styles.textContent = ConentScrollBarStyle;
    (_contentRef$current = contentRef.current) === null || _contentRef$current === void 0 ? void 0 : (_contentRef$current$s = _contentRef$current.shadowRoot) === null || _contentRef$current$s === void 0 ? void 0 : _contentRef$current$s.appendChild(styles);
  }, [(_contentRef$current2 = contentRef.current) === null || _contentRef$current2 === void 0 ? void 0 : _contentRef$current2.shadowRoot, contentRef]);
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