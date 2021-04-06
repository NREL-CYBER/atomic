import React from 'react';
import { AppButtons, AppToolbar } from '..';
import useCompletion from '../../hooks/useCompletion';
import AppProgress from '../AppProgress';
import { AppContinueButton } from './AppContinueButton';

/**
 * Completion aware bottom toolbar
 */

const AppCompletionToolbar: React.FC = ({ children }) => {

    const completion = useCompletion(x => x.completion);
    return (<>
        {<AppToolbar>
            <AppProgress color="favorite" value={completion()} />
            <AppButtons slot="end" >
                {children}
                <AppContinueButton />
            </AppButtons>
        </AppToolbar>
        }</>
    );
};
export default AppCompletionToolbar;