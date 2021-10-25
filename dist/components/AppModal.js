function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonModal } from '@ionic/react';
import React from 'react';
import { useAppSettings } from '../hooks/useAppSettings';

/**
 * Component for modals
 *  
 */
const AppModal = props => {
  const {
    children,
    smol,
    ...otherProps
  } = props;
  const {
    darkMode
  } = useAppSettings();
  return /*#__PURE__*/React.createElement(IonModal, _extends({
    animated: true,
    cssClass: [smol ? "smol" : "", darkMode ? "dark-theme" : "light-theme"],
    onDidDismiss: props.onDismiss && props.onDismiss
  }, otherProps), children);
};

export default AppModal;