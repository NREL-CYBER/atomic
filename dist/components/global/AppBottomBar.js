import React from 'react';
import { AppButtons, AppToolbar } from '..';
import { useAppSettings } from '../../hooks/useAppSettings';
import useCompletion from '../../hooks/useCompletion';
import AppProgress from '../AppProgress';
import { AppSettingsModal } from '../serialization/AppSettingsModal';
import { AppContinueButton } from './AppContinueButton';
export const AppCompletionProgress = () => {
  const completionValue = useCompletion(x => x.completion);
  return /*#__PURE__*/React.createElement(AppProgress, {
    color: "favorite",
    value: completionValue()
  });
};
/**
 * Completion aware bottom toolbar
 */

export const AppBottomBar = ({
  children,
  config
}) => {
  const {
    bottomBar,
    completion
  } = config;
  const {
    darkMode
  } = useAppSettings();
  const showContinue = bottomBar && bottomBar.showNext;
  return /*#__PURE__*/React.createElement(AppToolbar, {
    color: darkMode ? "paper" : "tertiary"
  }, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "start"
  }, bottomBar !== null && bottomBar !== void 0 && bottomBar.settings ? bottomBar === null || bottomBar === void 0 ? void 0 : bottomBar.settings : /*#__PURE__*/React.createElement(AppSettingsModal, {
    config: config
  }), bottomBar && bottomBar.start && /*#__PURE__*/React.createElement(bottomBar.start, null)), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, bottomBar && bottomBar.end && /*#__PURE__*/React.createElement(bottomBar.end, null), showContinue && /*#__PURE__*/React.createElement(AppContinueButton, null)), completion && !completion.disabled && /*#__PURE__*/React.createElement(AppCompletionProgress, null));
};