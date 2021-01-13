import React from "react";
import { AppButton, AppCard, AppRow } from "..";
import useCompletion from "../../hooks/useCompletion";
import useGuidance from "../../hooks/useGuidance";
import AppPopover from "../AppPopover";

const Guide = () => {
  const {
    guidance,
    status,
    dismiss
  } = useGuidance();
  const {
    latestUnockedPath
  } = useCompletion();
  return /*#__PURE__*/React.createElement(AppPopover, {
    onDismiss: () => dismiss(),
    isOpen: status === "open"
  }, /*#__PURE__*/React.createElement(AppCard, {
    title: "Greetings! Lets pick up where you left off..."
  }, /*#__PURE__*/React.createElement(AppRow, null, guidance), /*#__PURE__*/React.createElement(AppRow, null, /*#__PURE__*/React.createElement(AppButton, {
    routerLink: latestUnockedPath(),
    expand: "full",
    color: "favorite",
    fill: "outline",
    onClick: () => dismiss()
  }, "Continue"))));
};

export default Guide;