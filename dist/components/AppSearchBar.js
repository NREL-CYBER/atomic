function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonSearchbar } from '@ionic/react';
import React, { useLayoutEffect, useRef } from 'react';

/**
 * Component for a search interface
 */
const AppSearchBar = props => {
  const searchRef = useRef(null);
  useLayoutEffect(() => {
    setTimeout(() => {
      searchRef.current && props.focus && searchRef.current.setFocus();
    }, props.debounce || 100);
  }, [props.debounce, props.focus, searchRef]);
  return /*#__PURE__*/React.createElement(IonSearchbar, _extends({
    ref: searchRef,
    debounce: props.debounce || 100,
    onIonChange: e => {
      props.onQuery && props.onQuery(e.detail.value);
    }
  }, props));
};

export default AppSearchBar;