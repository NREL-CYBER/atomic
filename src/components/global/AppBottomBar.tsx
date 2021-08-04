import React from 'react';
import { AppButtons, AppToolbar } from '..';
import { useAppSettings } from '../../hooks/useAppSettings';
import useCompletion from '../../hooks/useCompletion';
import { AppConfig } from '../../util/AppConfig';
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

export const AppBottomBar: React.FC<{ config: AppConfig }> = ({ children, config }) => {
    const { bottomBar, completion } = config;
    const { darkMode } = useAppSettings();
    const showContinue = !(bottomBar && bottomBar.hideNext)
    return <AppToolbar color={darkMode ? "paper" : "tertiary"}>
        <AppButtons slot="start">
            <AppSettingsModal config={config} />
            {bottomBar && bottomBar.start && <bottomBar.start />}
        </AppButtons>
        <AppButtons slot="end" >
            {bottomBar && bottomBar.end && <bottomBar.end />}
            {showContinue && < AppContinueButton />}
        </AppButtons>
        {completion && !completion.disabled && <AppCompletionProgress />}
    </AppToolbar>
};
