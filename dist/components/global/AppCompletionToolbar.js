import { settingsOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { AppButtons, AppChip, AppInput, AppModal, AppToggle, AppToolbar } from '..';
import { useAppLayout } from '../../hooks';
import { useAppSettings } from '../../hooks/useAppSettings';
import useCompletion from '../../hooks/useCompletion';
import AppButton from '../AppButton';
import AppCard from '../AppCard';
import AppIcon from '../AppIcon';
import AppItem from '../AppItem';
import AppProgress from '../AppProgress';
import { AppContinueButton } from './AppContinueButton';
export const AppCompletionProgress = () => {
  const completionValue = useCompletion(x => x.completion);
  return /*#__PURE__*/React.createElement(AppProgress, {
    color: "favorite",
    value: completionValue()
  });
};
export const AppSettingsModal = () => {
  const [showSettings, setShowSettings] = useState(false);
  const {
    darkMode,
    setDarkMode,
    setServer,
    server
  } = useAppSettings();
  const {
    title
  } = useAppLayout();
  return showSettings ? /*#__PURE__*/React.createElement(AppModal, {
    isOpen: showSettings,
    onDismiss: () => {
      setShowSettings(false);
    }
  }, /*#__PURE__*/React.createElement(AppCard, {
    title: title + " Settings",
    headerColor: "tertiary"
  }, /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppChip, null, darkMode ? "Dark Mode" : "Light Mode"), /*#__PURE__*/React.createElement(AppToggle, {
    checked: darkMode,
    onToggleChange: isDark => {
      setDarkMode(isDark);
    }
  })), /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppChip, null, "Atomic Server URI:"), /*#__PURE__*/React.createElement(AppInput, {
    value: server,
    placeholder: "https://atomic-server-uri:{port-number}",
    onInputChange: input => {
      setServer(input);
    }
  })), server && /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => {},
    expand: "full"
  }, "Synchronize with server"))) : /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => {
      setShowSettings(true);
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: settingsOutline
  }));
};
/**
 * Completion aware bottom toolbar
 */

export const AppBottomBar = ({
  children,
  bottomBar,
  completion
}) => {
  const {
    darkMode
  } = useAppSettings();
  return /*#__PURE__*/React.createElement(AppToolbar, {
    color: darkMode ? "paper" : "tertiary"
  }, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "start"
  }, /*#__PURE__*/React.createElement(AppSettingsModal, null), bottomBar && bottomBar.start && /*#__PURE__*/React.createElement(bottomBar.start, null)), completion && !completion.disabled && /*#__PURE__*/React.createElement(AppCompletionProgress, null), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, bottomBar && bottomBar.end && /*#__PURE__*/React.createElement(bottomBar.end, null), /*#__PURE__*/React.createElement(AppContinueButton, null)));
};