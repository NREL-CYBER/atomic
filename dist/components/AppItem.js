function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonItem } from '@ionic/react';
import React from 'react';

/**
 * Component for items in a list
 * A very nice feature of this component is adding AppButtons inside
 * and attaching them to specific slots 
 * @example 
 * <AppItem>
 *      <AppButtons slot="start">
 *          <AppButton>Great left side button</AppButton>
 *      </AppButtons><AppButtons slot="end">
 *          <AppButton>A right side button</AppButton>
 *      </AppButtons>
 * </AppItem>
 */
const AppItem = props => {
  return /*#__PURE__*/React.createElement(IonItem, _extends({
    color: props.color ? props.color : "clear"
  }, props));
};

export default AppItem;