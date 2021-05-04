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
                {bottomBar && bottomBar.start && <bottomBar.start />}
            </AppButtons>
            {completion && !completion.disabled && < AppProgress color="favorite" value={completionValue()} />}
            <AppButtons slot="end" >
                {bottomBar && bottomBar.end && <bottomBar.end />}
                <AppContinueButton />
            </AppButtons>

        </AppToolbar>
        }</>
    );
};
export default AppCompletionToolbar;