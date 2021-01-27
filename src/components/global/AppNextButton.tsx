/**
 * Next step button
 */

import { arrowForwardOutline } from "ionicons/icons";
import React from "react";
import { useAppLayout, useCompletion } from "../..";
import { AppToolbar, AppButtons, AppButton, AppIcon, AppItemDivider } from "..";

export const AppNextButton: React.FC = () => {
    const next = useAppLayout(x => x.nextPage) || { path: "/", title: "", icon: "" };
    const { isUnlocked, pathStatusColor } = useCompletion();
    const color = pathStatusColor(next.path);
    return <>
        <AppToolbar >
            {<AppButtons slot="end">
                {isUnlocked(next.path) && <AppButton
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
