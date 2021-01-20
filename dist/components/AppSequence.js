/* eslint-disable react-hooks/exhaustive-deps */
import { helpOutline } from "ionicons/icons";
import React, { useMemo, useState } from "react";
import { AppButtons, AppCard, AppIcon, AppText } from ".";
import AppButton from "./AppButton";
import AppPopover from "./AppPopover";
import AppToolbar from "./AppToolbar";
/**
 * The root Sequence.
 */

const AppSequence = ({
  sequence,
  onBack,
  onNext
}) => {
  const {
    elements,
    guidance
  } = sequence;
  const [activeElementIndex, setActiveElementIndex] = useState(0);
  const activeSequenceElement = elements && elements[activeElementIndex];
  const {
    title
  } = activeSequenceElement || {
    title: "Complete"
  };
  const [showGuidance, setShowGuidance] = useState(false);
  const [status, setActiveElementStatus] = useState("locked");
  const sequenceComplete = onNext;
  const previousSequence = onBack;

  const SequenceElementInfo = () => /*#__PURE__*/React.createElement(AppToolbar, null, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "start"
  }, /*#__PURE__*/React.createElement(AppText, null, title)), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, /*#__PURE__*/React.createElement(AppButton, {
    fill: "clear",
    onClick: () => {
      setShowGuidance(true);
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: helpOutline
  }))));

  const SequenceElementNavigation = ({
    children,
    onNext,
    onBack
  }) => /*#__PURE__*/React.createElement(React.Fragment, null, children, /*#__PURE__*/React.createElement(AppToolbar, null, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, elements && activeElementIndex < elements.length ? /*#__PURE__*/React.createElement(AppButton, {
    disabled: status === "locked",
    onClick: onNext
  }, "Next") : /*#__PURE__*/React.createElement(AppButton, {
    onClick: sequenceComplete
  }, "Complete")), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "start"
  }, elements && activeElementIndex !== 0 ? /*#__PURE__*/React.createElement(AppButton, {
    onClick: onBack
  }, "Back") : /*#__PURE__*/React.createElement(AppButton, {
    onClick: previousSequence
  }, "Previous"))));

  const nextSequenceElement = () => setActiveElementIndex(x => x + 1);

  const previousSequenceElement = () => setActiveElementIndex(x => x - 1);

  const onStatusChange = status => {
    setActiveElementStatus(status);
  };

  const ActiveSequenceComponent = activeSequenceElement && activeSequenceElement.component ? () => activeSequenceElement.component({
    onStatusChange
  }) : () => /*#__PURE__*/React.createElement(AppText, null);
  return /*#__PURE__*/React.createElement(AppCard, {
    title: sequence.title
  }, useMemo(() => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SequenceElementInfo, null), /*#__PURE__*/React.createElement(ActiveSequenceComponent, null)), [activeElementIndex]), useMemo(() => /*#__PURE__*/React.createElement(SequenceElementNavigation, {
    onBack: previousSequenceElement,
    onNext: nextSequenceElement
  }), [status]), /*#__PURE__*/React.createElement(AppPopover, {
    isOpen: showGuidance,
    onDismiss: () => setShowGuidance(false)
  }, /*#__PURE__*/React.createElement("p", null, guidance)));
};

export default AppSequence;