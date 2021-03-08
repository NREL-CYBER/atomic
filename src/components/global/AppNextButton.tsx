/**
 * Next step button
 */

import { arrowForwardOutline } from "ionicons/icons";
import React from "react";
import { AppButton, AppButtons, AppIcon, AppItemDivider, AppToolbar } from "..";
import { useAppLayout, useCompletion } from "../../hooks";

export const AppNextButton: React.FC = () => {
    const next = useAppLayout(x => x.nextPage);
    const { isUnlocked, pathStatusColor } = useCompletion();
    const statusColor = pathStatusColor(next.path);
    const nextButtonUnlocked = isUnlocked(next.path);

    return <>
        <AppToolbar color="clear">
            {<AppButtons slot="end">
                <AppButton disabled={!nextButtonUnlocked}
                    fill='solid' color={statusColor}
                    routerDirection='forward' routerLink={next.path} >
                    <AppIcon icon={next.icon} />
                    {next.title}
                    <AppIcon icon={arrowForwardOutline} />
                </AppButton>
            </AppButtons>}
        </AppToolbar>
        <AppItemDivider />
    </>
}
