import React from 'react';
import { AppButtons, AppToolbar } from '..';
import useCompletion from '../../hooks/useCompletion';
import AppProgress from '../AppProgress';
import { AppContinueButton } from './AppContinueButton';

/**
 * Completion aware bottom toolbar
 */

const AppCompletionToolbar: React.FC<{ start?: React.FC, completion?: boolean, end?: React.FC }> = ({ children, start, end, completion }) => {

    const completionValue = useCompletion(x => x.completion);
    return (<>
        {<AppToolbar>
            <AppButtons slot="start">
                {start && start}
            </AppButtons>
            {!completion && <AppProgress color="favorite" value={completionValue()} />}
            <AppButtons slot="end" >
                {end ? end : <AppContinueButton />}
            </AppButtons>
        </AppToolbar>
        }</>
    );
};
export default AppCompletionToolbar;