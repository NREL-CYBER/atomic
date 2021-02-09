/**
 * Next step button
 */

import { arrowForwardOutline } from "ionicons/icons";
import React from "react";
import { AppToolbar, AppButtons, AppButton, AppIcon, AppItemDivider } from "..";
import { useAppLayout, useCompletion } from "../../hooks";

export const AppNextButton: React.FC = () => {
    const next = useAppLayout(x => x.nextPage);
    const { isUnlocked, pathStatusColor } = useCompletion();
    const color = pathStatusColor(next.path);

    const nextButtonVisible = isUnlocked(next.path);
    return <>
        <AppToolbar color="clear">
            {<AppButtons slot="end">
                {nextButtonVisible && <AppButton
                    fill='solid' color={color}
                    routerDirection='forward' routerLink={next.path} >
                    <AppIcon icon={next.icon} />
                    {next.title}
                    <AppIcon icon={arrowForwardOutline} />
                </AppButton>}
            </AppButtons>}
        </AppToolbar>
        <AppItemDivider />
    </>
}
