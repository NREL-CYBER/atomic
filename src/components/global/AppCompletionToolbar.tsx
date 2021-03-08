import { helpCircleOutline } from 'ionicons/icons';
import React from 'react';
import { AppButton, AppButtons, AppIcon, AppToolbar } from '..';
import useCompletion from '../../hooks/useCompletion';
import useGuidance from '../../hooks/useGuidance';
import AppProgress from '../AppProgress';
import { AppContinueButton } from './AppContinueButton';

/**
 * Completion aware bottom toolbar
 */

const AppCompletionToolbar: React.FC = ({ children }) => {
    const { show } = useGuidance();

    const completion = useCompletion(x => x.completion);
    return (<>
        {<AppToolbar>
            <AppProgress color="favorite" value={completion()} />
            <AppButtons slot="start">
                <AppButton onClick={() => show()}>
                    <AppIcon icon={helpCircleOutline} />
                </AppButton>
            </AppButtons>
            <AppButtons slot="end" >
                {children}
                <AppContinueButton />
            </AppButtons>
        </AppToolbar>
        }</>
    );
};
export default AppCompletionToolbar;