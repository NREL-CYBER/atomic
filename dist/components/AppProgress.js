import { IonProgressBar } from '@ionic/react';
import React from 'react';

/**
 * Component that stores the root of the application and control current theme
 */
const AppProgress = ({
  color = "primary",
  children,
  type = "indeterminate",
  value
}) => /*#__PURE__*/React.createElement(IonProgressBar, {
  color: color,
  children: children,
  type: type,
  value: value
});

export default AppProgress;