import useNotifications from "../../hooks/useNotifications";
import AppToast from "../AppToast";
import React from "react";
import useTimeout from 'use-timeout';

const Notifications = () => {
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
  return <>
        {notices && notices.map(notice => <AppToast key={notice.id} {...notice} onDismiss={id => dismiss(id)} />)}
    </>;
};

export default Notifications;