import { IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { AppBadge, AppContent, AppGrid, AppIcon, AppLabel, AppPage, AppRoute } from 'atomic';
import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { AppCard } from '.';
import { useAppSettings } from '../hooks/useAppSettings';
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
    height: number
    slot?: "top" | "bottom"
}

/**
 * Component to display text with optional color
 */
const AppTabs: React.FC<tabsProps> = (props) => {
    const { selectedTab, ...otherProps } = props;
    const [currentTab, setCurrentTab] = useState<string>(selectedTab)
    const [tabs] = useState<Record<string, AppTab>>(props.tabs
        .map((t) => ({ [t.path]: t }))
        .reduce((a, b) => ({ ...a, ...b }), {})
    )
    const { darkMode } = useAppSettings()
    return <AppCard headerColor="clear" contentColor="clear">
        <div style={{ minHeight: props.height, maxHeight: props.height }}>
            <IonTabs className={darkMode ? "dark-theme" : "light-theme"} onIonTabsWillChange={(event) => {
                setCurrentTab(event.detail.tab)
            }} onIonTabsDidChange={props.onTabsDidChange}  {...otherProps} >
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
        </div>
    </AppCard>
};
export default AppTabs;