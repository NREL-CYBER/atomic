import axios from "axios";
import { settingsOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { AppButton, AppButtons, AppChip, AppIcon, AppInput, AppItem, AppModal, AppTitle, AppToggle } from "..";
import { useAppSettings } from "../../hooks/useAppSettings";
export const AppSettingsModal = ({
  config
}) => {
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
  const title = config.title;
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

  if (config.settings && config.settings.disabled) {
    return /*#__PURE__*/React.createElement(React.Fragment, null);
  }

  const showServer = typeof config.settings?.show?.server === "undefined" ? false : config.settings.show.server;
  const showDarkMode = typeof config.settings?.show?.darkmode === "undefined" ? true : config.settings.show.darkmode;
  return showSettings ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppModal, {
    title: title + " Settings",
    isOpen: showSettings,
    onDismiss: () => {
      setShowSettings(false);
    }
  }, showDarkMode && /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppChip, null, darkMode ? "Dark Mode" : "Light Mode"), /*#__PURE__*/React.createElement(AppToggle, {
    checked: darkMode,
    onToggleChange: isDark => {
      setDarkMode(isDark);
    }
  })), showServer && /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppChip, null, config.title, " Sever URI:"), /*#__PURE__*/React.createElement(AppInput, {
    value: tempServer,
    placeholder: "https://server-uri:{port-number}/api/v{version-number}",
    onInputChange: input => {
      setTempServer(input);
    }
  }), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, endpoint && /*#__PURE__*/React.createElement(AppChip, {
    color: serverStatus === "connected" ? "favorite" : serverStatus === "connecting" ? "medium" : "danger"
  }, serverStatus))), tempServer !== endpoint && serverStatus !== "connecting" && showServer && /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => {
      setEndpoint(tempServer);
      setServerStatus("connecting");
    },
    expand: "full"
  }, "Synchronize with server"), serverStatus === "connected" && /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppTitle, {
    color: "favorite"
  }, "Synchronizing data with ", endpoint)), config.settings?.component, /*#__PURE__*/React.createElement(AppButton, {
    color: "primary",
    fill: "outline",
    expand: "full",
    onClick: () => {
      setShowSettings(false);
    }
  }, "OK")), /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => {
      setShowSettings(false);
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: settingsOutline
  }))) : /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => {
      setShowSettings(true);
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: settingsOutline
  }));
};