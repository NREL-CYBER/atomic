import { IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { AppBadge, AppIcon, AppLabel, AppRoute } from 'atomic';
import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { AppColor } from '../theme';

interface AppTab extends AppRoute {
    notifications?: number
    notificationColor?: AppColor
}
interface tabsProps {
    style?: Record<string, any>
    onTabsDidChange?: () => void
    tabs: AppTab[]
    selectedColor?: AppColor
    selectedTab: string
    slot?: "top" | "bottom"
}

/**
 * Component to display text with optional color
 */
const AppTabs: React.FC<tabsProps> = (props) => {
    const [currentTab, setCurrentTab] = useState<string>(props.selectedTab)
    const [tabs] = useState<Record<string, AppTab>>(props.tabs
        .map((t) => ({ [t.path]: t }))
        .reduce((a, b) => ({ ...a, ...b }), {})
    )
    return <IonTabs onIonTabsWillChange={(event) => {
        setCurrentTab(event.detail.tab)
    }} onIonTabsDidChange={props.onTabsDidChange}  {...props} >
        <IonTabBar slot={props.slot || "top"}>
            {props.tabs.map((tab, i) => <IonTabButton key={i} style={currentTab === tab.path ? { "--color": "var(--ion-color-" + props.selectedColor || "primary" } : {}} tab={tab.path}>
                <AppIcon icon={tab.icon} />
                <AppLabel>
                    {tab.title}
                </AppLabel>
                {tab.notifications && <AppBadge color={tab.notificationColor}>
                    {tab.notifications}
                </AppBadge>}
            </IonTabButton>)}
        </IonTabBar>
        <IonRouterOutlet>
            <Route path="*"
                component={tabs[currentTab].component} />
        </IonRouterOutlet>
    </IonTabs>
};
export default AppTabs;