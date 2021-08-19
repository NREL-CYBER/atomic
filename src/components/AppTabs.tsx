import { IonRouterOutlet, IonTabs } from '@ionic/react';
import { AppBadge, AppChip, AppIcon, AppLabel, AppRoute, AppRouterOutlet } from 'atomic';
import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { v4 } from 'uuid';
import { AppColor } from '../theme';
import AppTabButton from './AppTabButton';

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
        {props.tabs.map((tab) => <AppTabButton style={currentTab === tab.path ? { "--color": "var(--ion-color-" + props.selectedColor || "primary" } : {}} tab={tab.path}>
            <AppIcon icon={tab.icon} />
            <AppLabel>
                {tab.title}
            </AppLabel>
            {tab.notifications && <AppBadge color={tab.notificationColor}>
                {tab.notifications}
            </AppBadge>}
        </AppTabButton>)}
        <IonRouterOutlet>
            <Route path="*" component={() => <>{tabs[currentTab].component || <><AppChip color='danger'>Error, Missing Component for tab: {currentTab}</AppChip></>}</>} />
        </IonRouterOutlet>
    </IonTabs>
};
export default AppTabs;