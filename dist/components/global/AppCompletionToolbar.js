import React from 'react';
import { AppButtons, AppToolbar } from '..';
import useCompletion from '../../hooks/useCompletion';
import AppProgress from '../AppProgress';
import { AppContinueButton } from './AppContinueButton';
/**
 * Completion aware bottom toolbar
 */

const AppCompletionToolbar = ({
  children,
  start,
  end,
  completion
}) => {
  const completionValue = useCompletion(x => x.completion);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppToolbar, null, /*#__PURE__*/React.createElement(AppButtons, {
    slot: "start"
  }, start && start), !completion && /*#__PURE__*/React.createElement(AppProgress, {
    color: "favorite",
    value: completionValue()
  }), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, end ? end : /*#__PURE__*/React.createElement(AppContinueButton, null))));
};

export default AppCompletionToolbar;