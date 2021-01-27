function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import useNotifications from "../../hooks/useNotifications";
import AppToast from "../AppToast";
import React from "react";
import useTimeout from 'use-timeout';

const AppNotifications = () => {
  const {
    notices,
    dismiss,
    enable
  } = useNotifications();
  useTimeout(() => {
    // Throttle the first five seconds of notifications
    // this way we only get notifications when something happens in realtime,
    enable();
  }, 5000);
  return /*#__PURE__*/React.createElement(React.Fragment, null, notices && notices.map(notice => /*#__PURE__*/React.createElement(AppToast, _extends({
    key: notice.id
  }, notice, {
    onDismiss: id => dismiss(id)
  }))));
};

export default AppNotifications;