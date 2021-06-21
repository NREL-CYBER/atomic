import axios from 'axios';
import { settingsOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { AppButtons, AppChip, AppInput, AppModal, AppToggle, AppToolbar } from '..';
import { useAppLayout } from '../../hooks';
import { useAppSettings } from '../../hooks/useAppSettings';
import useCompletion from '../../hooks/useCompletion';
import { AppBottomBarConfig, AppCompletionConfig } from '../../util/AppConfig';
import AppButton from '../AppButton';
import AppCard from '../AppCard';
import AppIcon from '../AppIcon';
import AppItem from '../AppItem';
import AppProgress from '../AppProgress';
import { AppContinueButton } from './AppContinueButton';

export const AppCompletionProgress: React.FC = () => {
    const completionValue = useCompletion(x => x.completion);
    return < AppProgress color="favorite" value={completionValue()} />
}
export const AppSettingsModal: React.FC = () => {
    const [showSettings, setShowSettings] = useState(false);
    const { darkMode, setDarkMode, server, setServer, authorized, setAuthorized, serverStatus, setServerStatus } = useAppSettings();
    const { title } = useAppLayout();
    const [tempServer, setTempServer] = useState<string>(server || "")
    useEffect(() => {

        if (authorized && server && serverStatus === "connecting") {
            axios.get(server).then(() => {
                setServerStatus("connected")
            }).catch(() => {
                setServerStatus("error")
            })
        } else if (!authorized && server) {
            const authorized = window.confirm("To connect to a server will open a connection to the specified URI.\n Are you in a trusted environment?\n Are you sure you want to do this?")
            setAuthorized(authorized);
        }
    }, [authorized, server, serverStatus, setAuthorized, setServerStatus])
    return showSettings ? <AppModal isOpen={showSettings} onDismiss={() => { setShowSettings(false) }}>
        < AppCard title={title + " Settings"} headerColor="tertiary" >
            <AppItem>
                <AppChip>
                    {darkMode ? "Dark Mode" : "Light Mode"}
                </AppChip>
                <AppToggle checked={darkMode} onToggleChange={(isDark) => {
                    setDarkMode(isDark)
                }} />
            </AppItem>
            <AppItem>
                <AppChip>
                    Atomic Server URI:
                </AppChip>
                <AppInput value={tempServer} placeholder={"https://atomic-server-uri:{port-number}"} onInputChange={(input) => {
                    setTempServer(input)
                }} >
                </AppInput>
                <AppButtons slot="end">
                    {server && <AppChip color={serverStatus === "connected" ? "favorite" : serverStatus === "connecting" ? "medium" : "danger"}>{serverStatus}</AppChip>}
                </AppButtons>
            </AppItem>
            {server && tempServer !== server && <AppButton onClick={() => {
                setServer(tempServer);
                setServerStatus("connecting");
            }} expand={"full"}>
                Synchronize with server
            </AppButton>}
            {serverStatus === "connected" && <AppChip color="favorite">Synchronizing data with {server}</AppChip>}
        </AppCard >
    </AppModal > : <AppButton onClick={() => {
        setShowSettings(true);
    }}>
        <AppIcon icon={settingsOutline} />
    </AppButton>
}


/**
 * Completion aware bottom toolbar
 */

export const AppBottomBar: React.FC<{ completion?: AppCompletionConfig, bottomBar?: AppBottomBarConfig }> = ({ children, bottomBar, completion }) => {
    const { darkMode } = useAppSettings();

    return <AppToolbar color={darkMode ? "paper" : "tertiary"}>
        <AppButtons slot="start">
            <AppSettingsModal />
            {bottomBar && bottomBar.start && <bottomBar.start />}
        </AppButtons>
        <AppButtons slot="end" >
            {bottomBar && bottomBar.end && <bottomBar.end />}
            <AppContinueButton />
        </AppButtons>
        {completion && !completion.disabled && <AppCompletionProgress />}
    </AppToolbar>
};
