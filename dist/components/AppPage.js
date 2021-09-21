import { IonPage } from '@ionic/react';
import React from 'react';
/**
 * Functional Component that wraps any root page
 */

const AppPage = ({
  children,
  fullscreen = false,
  id
}) => {
  return /*#__PURE__*/React.createElement(IonPage, {
    id: id || "main"
  }, children);
};

export default AppPage;