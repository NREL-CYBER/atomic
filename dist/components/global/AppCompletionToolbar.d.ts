import React from 'react';
import { AppBottomBarConfig, AppCompletionConfig } from '../../util/AppConfig';
export declare const AppCompletionProgress: React.FC;
export declare const AppSettingsModal: React.FC;
/**
 * Completion aware bottom toolbar
 */
export declare const AppBottomBar: React.FC<{
    completion?: AppCompletionConfig;
    bottomBar?: AppBottomBarConfig;
}>;
