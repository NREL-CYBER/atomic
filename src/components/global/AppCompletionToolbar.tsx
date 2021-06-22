import React from 'react';
import { AppButtons, AppToolbar } from '..';
import { useAppSettings } from '../../hooks/useAppSettings';
import useCompletion from '../../hooks/useCompletion';
import { AppBottomBarConfig, AppCompletionConfig } from '../../util/AppConfig';
import AppProgress from '../AppProgress';
import { AppSettingsModal } from '../serialization/AppSettingsModal';
import { AppContinueButton } from './AppContinueButton';

export const AppCompletionProgress: React.FC = () => {
    const completionValue = useCompletion(x => x.completion);
    return < AppProgress color="favorite" value={completionValue()} />
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
