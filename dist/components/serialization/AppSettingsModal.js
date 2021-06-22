import { useAppLayout } from "atomic";
import axios from "axios";
import { settingsOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { AppButton, AppButtons, AppCard, AppChip, AppIcon, AppInput, AppItem, AppModal, AppTitle, AppToggle } from "..";
import { useAppSettings } from "../../hooks/useAppSettings";
export const AppSettingsModal = () => {
  const [showSettings, setShowSettings] = useState(false);
  const {
    darkMode,
    setDarkMode,
    endpoint,
    setEndpoint,
    authorized,
    setAuthorized,
    serverStatus,
    setServerStatus
  } = useAppSettings();
  const {
    title
  } = useAppLayout();
  const [tempServer, setTempServer] = useState(endpoint || "");
  useEffect(() => {
    if (authorized && endpoint && serverStatus === "connecting") {
      axios.get(endpoint).then(() => {
        setServerStatus("connected");
      }).catch(() => {
        setServerStatus("error");
      });
    }

    if (authorized && serverStatus === "unknown") {
      setServerStatus("connecting");
    } else if (!authorized && serverStatus === "connecting") {
      const authorized = window.confirm("To connect to a server will open a connection to the specified URI.\n Are you in a trusted environment?\n Are you sure you want to do this?");
      setAuthorized(authorized);
    }
  }, [authorized, endpoint, serverStatus, setAuthorized, setServerStatus, tempServer]);
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
    placeholder: "https://atomic-server-uri:{port-number}/api/v{version-number}",
    onInputChange: input => {
      setTempServer(input);
    }
  }), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, endpoint && /*#__PURE__*/React.createElement(AppChip, {
    color: serverStatus === "connected" ? "favorite" : serverStatus === "connecting" ? "medium" : "danger"
  }, serverStatus))), tempServer !== endpoint && serverStatus !== "connecting" && /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => {
      setEndpoint(tempServer);
      setServerStatus("connecting");
    },
    expand: "full"
  }, "Synchronize with server"), serverStatus === "connected" && /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppTitle, {
    color: "favorite"
  }, "Synchronizing data with ", endpoint)))) : /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => {
      setShowSettings(true);
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: settingsOutline
  }));
};