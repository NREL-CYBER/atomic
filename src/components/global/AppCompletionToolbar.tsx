import React, { useState } from 'react';
import { AppButtons, AppToolbar, AppToggle, AppChip, AppModal } from '..';
import useCompletion from '../../hooks/useCompletion';
import AppProgress from '../AppProgress';
import { AppContinueButton } from './AppContinueButton';
import { useAppLayout } from '../../hooks';
import AppButton from '../AppButton';
import AppIcon from '../AppIcon';
import { settingsOutline } from 'ionicons/icons';
import AppItem from '../AppItem';
import AppCard from '../AppCard';
import { AppCompletionConfig, AppBottomBarConfig } from '../../util/AppConfig';
import { config } from 'process';

/**
 * Completion aware bottom toolbar
 */

const AppCompletionToolbar: React.FC<{ completion?: AppCompletionConfig, bottomBar?: AppBottomBarConfig }> = ({ children, bottomBar, completion }) => {
    const { setDarkMode, darkMode, title } = useAppLayout()
    const completionValue = useCompletion(x => x.completion);
    const [showSettings, setShowSettings] = useState(false);

    return (<>
        {showSettings && <AppModal isOpen={showSettings} onDismiss={() => { setShowSettings(false) }}>
            <AppCard title={title + " Settings"} headerColor="tertiary">

                <AppItem>
                    <AppChip>
                        {darkMode ? "Dark Mode" : "Light Mode"}
                    </AppChip>
                    <AppToggle checked={darkMode} onToggleChange={(isDark) => {
                        setDarkMode(isDark)
                    }} />
                </AppItem>
            </AppCard>

        </AppModal>}
        {<AppToolbar color={darkMode ? "paper" : "tertiary"}>
            <AppButtons slot="start">
                <AppButton onClick={() => {
                    setShowSettings(true);
                }}>
                    <AppIcon icon={settingsOutline} />
                </AppButton>
                {bottomBar?.start && <bottomBar.start />}
            </AppButtons>
            {completion && !completion.disabled && < AppProgress color="favorite" value={completionValue()} />}
            <AppButtons slot="end" >
                {bottomBar?.end && <bottomBar.end />}
            </AppButtons>
        </AppToolbar>
        }</>
    );
};
export default AppCompletionToolbar;