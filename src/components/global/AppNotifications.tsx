import useNotifications from "../../hooks/useNotifications";
import AppToast from "../AppToast";
import React, { FC } from "react";
import useTimeout from 'use-timeout'

const AppNotifications: FC = () => {
    const { notices, dismiss, enable } = useNotifications();

    useTimeout(() => {
        // Throttle the first five seconds of notifications
        // this way we only get notifications when something happens in realtime,
        enable();
    }, 1000);
    return <>
        {notices && notices.map(notice => <AppToast key={notice.id} {...notice} onDismiss={(id) => dismiss(id)} />)}
    </>
}

export default AppNotifications;

