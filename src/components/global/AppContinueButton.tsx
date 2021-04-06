/**
 * Next step button
 */

import { arrowForwardOutline } from "ionicons/icons";
import React from "react";
import { AppButton, AppButtons, AppIcon, AppItemDivider, AppToolbar } from "..";
import { useAppLayout, useCompletion } from "../../hooks";

export const AppContinueButton: React.FC = () => {
    const { allPageRoutes, path } = useAppLayout();
    const { isUnlocked, pathStatusColor, isValid } = useCompletion();
    const continueRoute = allPageRoutes.find(({ path }) => isUnlocked(path) && !isValid(path))
    const statusColor = continueRoute ? pathStatusColor(continueRoute.path) : "clear"
    return <>
        <AppToolbar color="clear">
            {<AppButtons slot="end">
                {continueRoute && path !== continueRoute.path ? <AppButton
                    fill='clear' color={statusColor}
                    routerDirection='forward' routerLink={continueRoute.path} >
                    <AppIcon icon={continueRoute.icon} />
                    {continueRoute.title}
                    <AppIcon icon={arrowForwardOutline} />
                </AppButton> : <></>}
            </AppButtons>}
        </AppToolbar>
        <AppItemDivider />
    </>
}
