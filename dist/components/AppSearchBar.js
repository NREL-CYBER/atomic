function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonSearchbar } from '@ionic/react';
import React from 'react';

/**
 * Component for a search interface
 */
const AppSearchBar = props => {
  return /*#__PURE__*/React.createElement(IonSearchbar, _extends({
    debounce: 100,
    onIonChange: e => {
      props.onQuery && props.onQuery(e.detail.value);
    }
  }, props));
};

export default AppSearchBar;