import { IonPage, IonContent } from '@ionic/react';
import React from 'react';
/**
 * Functional Component that wraps any root page
 */

const AppPage = ({
  children,
  fullscreen = false
}) => {
  return /*#__PURE__*/React.createElement(IonPage, {
    id: "main"
  }, !fullscreen && /*#__PURE__*/React.createElement("div", {
    style: {
      height: 55
    }
  }), /*#__PURE__*/React.createElement(IonContent, {
    slot: "fixed"
  }, children), !fullscreen && /*#__PURE__*/React.createElement("div", {
    style: {
      height: 55
    }
  }));
};

export default AppPage;