import { helpCircleOutline } from 'ionicons/icons';
import React from 'react';
import { AppButton, AppButtons, AppIcon, AppToolbar } from '..';
import useCompletion from '../../hooks/useCompletion';
import useGuidance from '../../hooks/useGuidance';
import AppProgress from '../AppProgress';
import { AppContinueButton } from './AppContinueButton';
/**
 * Completion aware bottom toolbar
 */

const AppCompletionToolbar = ({
  children
}) => {
  const {
    show
  } = useGuidance();
  const completion = useCompletion(x => x.completion);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppToolbar, null, /*#__PURE__*/React.createElement(AppProgress, {
    color: "favorite",
    value: completion()
  }), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "start"
  }, /*#__PURE__*/React.createElement(AppButton, {
    onClick: () => show()
  }, /*#__PURE__*/React.createElement(AppIcon, {
    icon: helpCircleOutline
  }))), /*#__PURE__*/React.createElement(AppButtons, {
    slot: "end"
  }, children, /*#__PURE__*/React.createElement(AppContinueButton, null))));
};

export default AppCompletionToolbar;