import React from 'react';
import { AppCompletionConfig } from '../../util/AppConfig';
/**
 * Completion aware bottom toolbar
 */
declare const AppCompletionToolbar: React.FC<{
    start?: React.FC;
    completion?: AppCompletionConfig;
    end?: React.FC;
}>;
export default AppCompletionToolbar;
