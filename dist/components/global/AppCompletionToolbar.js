import axios from 'axios';
import { settingsOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
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
    type: "determinate",
    color: "favorite",
    value: completionValue()
  });
};
export const AppSettingsModal = () => {
  const [showSettings, setShowSettings] = useState(false);
  const {
    darkMode,
    setDarkMode,
    server,
    setServer,
    authorized,
    setAuthorized,
    serverStatus,
    setServerStatus
  } = useAppSettings();
  const {
    title
  } = useAppLayout();
  const [tempServer, setTempServer] = useState(server || "");
  useEffect(() => {
    if (authorized && server && serverStatus === "connecting") {
      axios.get(server).then(() => {
        setServerStatus("connected");
      }).catch(() => {
        setServerStatus("error");
      });
    } else if (!authorized && server) {
      const authorized = window.confirm("To connect to a server will open a connection to the specified URI.\n Are you in a trusted environment?\n Are you sure you want to do this?");
      setAuthorized(authorized);
    }
  }, [authorized, server, serverStatus, setAuthorized, setServerStatus]);
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
    value: tempServer,
    placeholder: "https://atomic-server-uri:{port-number}",
    onInputChange: input => {
      setTempServer(input);
    }
  }), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, server && /*#__PURE__*/React.createElement(AppChip, {
    color: serverStatus === "connected" ? "favorite" : serverStatus === "connecting" ? "medium" : "danger"
  }, serverStatus))), server && tempServer !== server && /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => {
      setServer(tempServer);
      setServerStatus("connecting");
    },
    expand: "full"
  }, "Synchronize with server"), serverStatus === "connected" && /*#__PURE__*/React.createElement(AppChip, {
    color: "favorite"
  }, "Synchronizing data with ", server))) : /*#__PURE__*/React.createElement(AppButton, {
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
  }, /*#__PURE__*/React.createElement(AppSettingsModal, null), bottomBar && bottomBar.start && /*#__PURE__*/React.createElement(bottomBar.start, null)), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, bottomBar && bottomBar.end && /*#__PURE__*/React.createElement(bottomBar.end, null), /*#__PURE__*/React.createElement(AppContinueButton, null)), completion && !completion.disabled && /*#__PURE__*/React.createElement(AppCompletionProgress, null));
};