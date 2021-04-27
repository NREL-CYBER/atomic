import React from 'react';
import { AppCompletionConfig, AppBottomBarConfig } from '../../util/AppConfig';
/**
 * Completion aware bottom toolbar
 */
declare const AppCompletionToolbar: React.FC<{
    completion?: AppCompletionConfig;
    bottomBar?: AppBottomBarConfig;
}>;
export default AppCompletionToolbar;
