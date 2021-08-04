import axios from "axios";
import { settingsOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { AppButton, AppButtons, AppCard, AppChip, AppIcon, AppInput, AppItem, AppModal, AppTitle, AppToggle } from "..";
import { useAppLayout } from "../../hooks";
import { useAppSettings } from "../../hooks/useAppSettings";
import { AppConfig } from "../../util";

export const AppSettingsModal: React.FC<{ config: AppConfig }> = ({ config }) => {
    const [showSettings, setShowSettings] = useState(false);
    const { darkMode, setDarkMode, endpoint, setEndpoint, authorized, setAuthorized, serverStatus, setServerStatus } = useAppSettings();
    const { title } = useAppLayout();
    const [tempServer, setTempServer] = useState<string>(endpoint || "")
    useEffect(() => {

        if (authorized && endpoint && serverStatus === "connecting") {
            axios.get(endpoint).then(() => {
                setServerStatus("connected")
            }).catch(() => {
                setServerStatus("error")
            })
        } if (authorized && serverStatus === "unknown") {
            setServerStatus("connecting");
        }
        else if (!authorized && serverStatus === "connecting") {
            const authorized = window.confirm("To connect to a server will open a connection to the specified URI.\n Are you in a trusted environment?\n Are you sure you want to do this?")
            setAuthorized(authorized);
        }
    }, [authorized, endpoint, serverStatus, setAuthorized, setServerStatus, tempServer])
    if (config.settings && config.settings.disabled) {
        return <></>
    }
    const showServer = typeof config.settings?.show?.server === "undefined" ? true : config.settings.show.server
    const showDarkMode = typeof config.settings?.show?.darkmode === "undefined" ? true : config.settings.show.darkmode
    return showSettings ? <AppModal isOpen={showSettings} onDismiss={() => { setShowSettings(false) }}>
        < AppCard title={title + " Settings"} headerColor="tertiary" >
            {showDarkMode && <AppItem>
                <AppChip>
                    {darkMode ? "Dark Mode" : "Light Mode"}
                </AppChip>
                <AppToggle checked={darkMode} onToggleChange={(isDark) => {
                    setDarkMode(isDark)
                }} />
            </AppItem>}
            {showServer && <AppItem>
                <AppChip>
                    {config.title} Sever URI:
                </AppChip>
                <AppInput value={tempServer} placeholder={"https://server-uri:{port-number}/api/v{version-number}"} onInputChange={(input) => {
                    setTempServer(input)
                }} >
                </AppInput>
                <AppButtons slot="end">
                    {endpoint && <AppChip color={serverStatus === "connected" ? "favorite" : serverStatus === "connecting" ? "medium" : "danger"}>{serverStatus}</AppChip>}
                </AppButtons>
            </AppItem>}
            {tempServer !== endpoint && serverStatus !== "connecting" && < AppButton onClick={() => {
                setEndpoint(tempServer);
                setServerStatus("connecting");
            }} expand={"full"}>
                Synchronize with server
            </AppButton>}
            {serverStatus === "connected" && <AppItem>
                <AppTitle color="favorite">Synchronizing data with {endpoint}</AppTitle>
            </AppItem>}
            {config.settings?.component}
        </AppCard >
        <AppButton color='primary' fill="outline" expand="full" onClick={() => {
            setShowSettings(false);
        }}>
            OK
        </AppButton>
    </AppModal > : <AppButton onClick={() => {
        setShowSettings(true);
    }}>
        <AppIcon icon={settingsOutline} />
    </AppButton>
}
