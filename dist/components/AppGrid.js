function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonGrid } from '@ionic/react';
import React, { useLayoutEffect, useRef } from 'react';
import { ConentScrollBarStyle } from "./AppContent";

/**
 * Component to house a grid of AppCol and AppRow
 * you can do AppCol or AppRow first depending on your context
 * anything is possible!
 */
const AppGrid = props => {
  var _gridRef$current2;

  const gridRef = useRef(null);
  useLayoutEffect(() => {
    var _gridRef$current, _gridRef$current$shad;

    const styles = document.createElement('style');
    styles.textContent = ConentScrollBarStyle;
    (_gridRef$current = gridRef.current) === null || _gridRef$current === void 0 ? void 0 : (_gridRef$current$shad = _gridRef$current.shadowRoot) === null || _gridRef$current$shad === void 0 ? void 0 : _gridRef$current$shad.appendChild(styles);
  }, [(_gridRef$current2 = gridRef.current) === null || _gridRef$current2 === void 0 ? void 0 : _gridRef$current2.shadowRoot, gridRef]);
  return /*#__PURE__*/React.createElement(IonGrid, _extends({
    ref: gridRef
  }, props));
};

export default AppGrid;