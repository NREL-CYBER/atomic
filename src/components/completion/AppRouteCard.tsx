import { checkmark } from "ionicons/icons";
import React, { FC } from "react";
import { AppCard, AppList, AppItem, AppButtons, AppIcon, AppTitle } from "..";
import { AppRoute } from "../../core/routing";
import { useCompletion } from "../../hooks";

const AppRouteCard: FC<AppRoute> = ({ path, icon, title }) => {
    const { pathStatusColor, isUnlocked, isValid } = useCompletion();
    const routeColor = pathStatusColor(path);
    return <AppCard headerColor="paper"
        title={
            <AppList lines="inset">
                <AppItem color="clear" routerLink={isUnlocked(path) ? path : undefined} >
                    <AppButtons slot="start">
                        <AppIcon color={routeColor} size="large" icon={icon} />
                        <AppTitle color={routeColor}>
                            {title}
                        </AppTitle>
                    </AppButtons>
                    <AppButtons slot="end">
                        {isValid(path) && <AppIcon color={routeColor} size={"large"} icon={checkmark} />}
                    </AppButtons>
                </AppItem>
            </AppList>
        }>
    </AppCard >
}
export default AppRouteCard;