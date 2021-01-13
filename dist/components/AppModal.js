function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonModal } from '@ionic/react';
import React from 'react';

/**
 * Component for modals
 *  
 */
const AppModal = props => /*#__PURE__*/React.createElement(IonModal, _extends({
  onDidDismiss: props.onDismiss && props.onDismiss
}, props));

export default AppModal;