import { arrowForwardOutline, helpBuoyOutline, helpCircleOutline } from 'ionicons/icons';
import React from 'react';
import { AppButton, AppButtons, AppIcon, AppToolbar } from '..';
import useAppLayout from '../../hooks/useAppLayout';
import useCompletion from '../../hooks/useCompletion';
import useGuidance from '../../hooks/useGuidance';
import AppProgress from '../AppProgress';



/**
 * Next step button
 */

export const NextPageButton: React.FC = () => {
    const next = useAppLayout(x => x.nextPage);
    const { isUnlocked, pathStatusColor } = useCompletion();
    const disabled = !isUnlocked(next.path);
    const color = pathStatusColor(next.path);
    return <AppButton
        fill='solid' color={color} routerDirection='forward' routerLink={next.path} disabled={disabled} >
        <AppIcon icon={next.icon} />{next.title}<AppIcon icon={arrowForwardOutline}></AppIcon>
    </AppButton>
}
/**
 * Completion aware bottom toolbar
 */

const BottomToolbar: React.FC = ({ children }) => {
    const { show } = useGuidance();

    const completion = useCompletion(x => x.completion);
    return (<>
        <AppToolbar>
            <AppProgress color="favorite" value={completion()} />
            <AppButtons slot="start">
                <AppButton onClick={() => show()}>
                    <AppIcon icon={helpCircleOutline} />
                </AppButton>
            </AppButtons>
            <AppButtons slot="end" >
                {<NextPageButton />}
            </AppButtons>
        </AppToolbar></>
    );
};
export default BottomToolbar;