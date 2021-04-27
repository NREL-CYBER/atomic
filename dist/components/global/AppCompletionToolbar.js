import React, { useState } from 'react';
import { AppButtons, AppToolbar, AppToggle, AppChip, AppModal } from '..';
import useCompletion from '../../hooks/useCompletion';
import AppProgress from '../AppProgress';
import { useAppLayout } from '../../hooks';
import AppButton from '../AppButton';
import AppIcon from '../AppIcon';
import { settingsOutline } from 'ionicons/icons';
import AppItem from '../AppItem';
import AppCard from '../AppCard';

/**
 * Completion aware bottom toolbar
 */
const AppCompletionToolbar = ({
  children,
  bottomBar,
  completion
}) => {
  const {
    setDarkMode,
    darkMode,
    title
  } = useAppLayout();
  const completionValue = useCompletion(x => x.completion);
  const [showSettings, setShowSettings] = useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, showSettings && /*#__PURE__*/React.createElement(AppModal, {
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
  })))), /*#__PURE__*/React.createElement(AppToolbar, {
    color: darkMode ? "paper" : "tertiary"
  }, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "start"
  }, /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => {
      setShowSettings(true);
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: settingsOutline
  })), bottomBar?.start && /*#__PURE__*/React.createElement(bottomBar.start, null)), completion && !completion.disabled && /*#__PURE__*/React.createElement(AppProgress, {
    color: "favorite",
    value: completionValue()
  }), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, bottomBar?.end && /*#__PURE__*/React.createElement(bottomBar.end, null))));
};

export default AppCompletionToolbar;