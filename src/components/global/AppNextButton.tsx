/**
 * Next step button
 */

import { arrowForwardOutline } from "ionicons/icons";
import React from "react";
import { AppButton, AppButtons, AppIcon } from "..";
import { useAppLayout, useCompletion } from "../../hooks";

export const AppNextButton: React.FC<{ fill?: "outline" | "solid" | "clear" }> = ({ fill = "solid" }) => {
    const next = useAppLayout(x => x.nextPage);
    const { isUnlocked, pathStatusColor } = useCompletion();
    const statusColor = pathStatusColor(next.path);
    const nextButtonUnlocked = isUnlocked(next.path);

    return <>
        {<AppButtons slot="end">
            <AppButton disabled={!nextButtonUnlocked}
                fill={fill} color={statusColor}
                routerDirection='forward' routerLink={next.path} >
                <AppIcon icon={next.icon} />
                {next.title}
                <AppIcon icon={arrowForwardOutline} />
            </AppButton>
        </AppButtons>}
    </>
}
