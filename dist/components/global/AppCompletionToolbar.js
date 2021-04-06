import React from 'react';
import { AppButtons, AppToolbar } from '..';
import useCompletion from '../../hooks/useCompletion';
import AppProgress from '../AppProgress';
import { AppContinueButton } from './AppContinueButton';
/**
 * Completion aware bottom toolbar
 */

const AppCompletionToolbar = ({
  children
}) => {
  const completion = useCompletion(x => x.completion);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppToolbar, null, /*#__PURE__*/React.createElement(AppProgress, {
    color: "favorite",
    value: completion()
  }), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, children, /*#__PURE__*/React.createElement(AppContinueButton, null))));
};

export default AppCompletionToolbar;