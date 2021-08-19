function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonTabs } from '@ionic/react';
import React from 'react';

/**
 * Component to display text with optional color
 */
const AppTabs = props => {
  return /*#__PURE__*/React.createElement(IonTabs, _extends({
    onIonTabsWillChange: props.onTabsWillChange,
    onIonTabsDidChange: props.onTabsDidChange
  }, props));
};

export default AppTabs;