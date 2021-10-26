function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonModal } from '@ionic/react';
import { AppContent } from 'atomic';
import { closeOutline } from 'ionicons/icons';
import React, { useRef } from 'react';
import { useAppSettings } from '../hooks/useAppSettings';
import AppFab from './AppFab';
import AppFabButton from './AppFabButton';
import AppIcon from './AppIcon';

/**
 * Component for modals
 *  
 */
const AppModal = props => {
  const {
    children,
    smol,
    title,
    ...otherProps
  } = props;
  const {
    darkMode
  } = useAppSettings();
  const ref = useRef(null);
  return /*#__PURE__*/React.createElement(IonModal, _extends({
    ref: ref,
    animated: true,
    cssClass: [smol ? "smol" : "", darkMode ? "dark-theme" : "light-theme"],
    onDidDismiss: props.onDismiss && props.onDismiss
  }, otherProps), /*#__PURE__*/React.createElement(AppFab, {
    vertical: "top",
    horizontal: "end"
  }, /*#__PURE__*/React.createElement(AppFabButton, {
    size: "small",
    color: "light",
    onClick: () => {
      ref.current?.dismiss();
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: closeOutline
  }))), /*#__PURE__*/React.createElement(AppContent, null, children));
};

export default AppModal;