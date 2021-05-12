import { settingsOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { AppButtons, AppChip, AppModal, AppToggle, AppToolbar } from '..';
import { useAppLayout } from '../../hooks';
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
    const { darkMode, setDarkMode, title } = useAppLayout();
    return showSettings ? <AppModal isOpen={showSettings} onDismiss={() => { setShowSettings(false) }}>
        < AppCard title={title + " Settings"
        } headerColor="tertiary" >
            <AppItem>
                <AppChip>
                    {darkMode ? "Dark Mode" : "Light Mode"}
                </AppChip>
                <AppToggle checked={darkMode} onToggleChange={(isDark) => {
                    setDarkMode(isDark)
                }} />
            </AppItem>
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
    const { darkMode } = useAppLayout();

    return <AppToolbar color={darkMode ? "paper" : "tertiary"}>
        <AppButtons slot="start">
            <AppSettingsModal />
            {bottomBar && bottomBar.start && <bottomBar.start />}
        </AppButtons>
        {completion && !completion.disabled && <AppCompletionProgress />}
        <AppButtons slot="end" >
            {bottomBar && bottomBar.end && <bottomBar.end />}
            <AppContinueButton />
        </AppButtons>

    </AppToolbar>
};
