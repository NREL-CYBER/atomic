function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { IonModal } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React, { useRef } from 'react';
import { AppButtons, AppContent, AppItem, AppSelectButtons, AppTitle } from '.';
import { useAppSettings } from '../hooks/useAppSettings';
import AppButton from './AppButton';
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
    buttons,
    titleColor,
    headerColor,
    ...otherProps
  } = props;
  const {
    darkMode
  } = useAppSettings();
  const ref = useRef(null);
  return /*#__PURE__*/React.createElement("div", {
    className: smol ? "smol" : "large"
  }, /*#__PURE__*/React.createElement(IonModal, _extends({
    ref: ref,
    animated: true,
    cssClass: [darkMode ? "dark-theme" : "light-theme"],
    onDidDismiss: props.onDismiss
  }, otherProps), title && /*#__PURE__*/React.createElement(AppItem, {
    color: headerColor || 'light'
  }, /*#__PURE__*/React.createElement(AppTitle, {
    color: titleColor || 'tertiary'
  }, title), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => {
      ref.current?.dismiss();
    },
    color: "danger",
    fill: "clear"
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: closeOutline
  })))), /*#__PURE__*/React.createElement(AppContent, null, children), /*#__PURE__*/React.createElement(React.Fragment, null), buttons && /*#__PURE__*/React.createElement(AppSelectButtons, buttons)));
};

export default AppModal;