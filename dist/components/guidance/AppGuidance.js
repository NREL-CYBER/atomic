import React from "react";
import AppModal from "../AppModal";
import { useGuidance, AppText, AppCard, AppButtons } from "../..";
import AppIcon from "../AppIcon";
import { closeOutline } from "ionicons/icons";
import AppButton from "../AppButton";
import AppItem from "../AppItem";
import AppTitle from "../AppTitle";

const AppGuidance = () => {
  const {
    guidance,
    status,
    dismiss
  } = useGuidance();
  return /*#__PURE__*/React.createElement(AppModal, {
    onDismiss: () => {},
    isOpen: status === "open"
  }, /*#__PURE__*/React.createElement(AppItem, {
    color: "tertiary"
  }, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "start"
  }, /*#__PURE__*/React.createElement(AppTitle, null, "Guidance")), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, /*#__PURE__*/React.createElement(AppButton, {
    fill: "clear",
    onClick: dismiss
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: closeOutline
  })))), /*#__PURE__*/React.createElement(AppCard, null, /*#__PURE__*/React.createElement(AppText, null, guidance)), /*#__PURE__*/React.createElement(AppItem, null, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, /*#__PURE__*/React.createElement(AppButton, {
    onClick: dismiss
  }, /*#__PURE__*/React.createElement(AppTitle, null, "OK")))));
};

export default AppGuidance;