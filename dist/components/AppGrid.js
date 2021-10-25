function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonGrid } from '@ionic/react';
import React, { useLayoutEffect, useRef } from 'react';
import { ConentScrollBarStyle } from './AppContent';

/**
 * Component to house a grid of AppCol and AppRow
 * you can do AppCol or AppRow first depending on your context
 * anything is possible!
 */
const AppGrid = props => {
  const gridRef = useRef(null);
  useLayoutEffect(() => {
    const styles = document.createElement('style');
    styles.textContent = ConentScrollBarStyle;
    gridRef.current?.shadowRoot?.appendChild(styles);
  }, [gridRef.current?.shadowRoot, gridRef]);
  return /*#__PURE__*/React.createElement(IonGrid, _extends({
    ref: gridRef
  }, props));
};

export default AppGrid;