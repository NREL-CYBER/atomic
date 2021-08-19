import { IonTabs } from '@ionic/react';
import { AppBadge, AppIcon, AppLabel, AppRoute, AppRouterOutlet } from 'atomic';
import React, { useState } from 'react';
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
    children: React.ReactNode
    tabs: AppTab[]
    selectedColor?: AppColor
}

/**
 * Component to display text with optional color
 */
const AppTabs: React.FC<tabsProps> = (props) => {
    const [currentTab, setCurrentTab] = useState<string>()
    return <IonTabs onIonTabsWillChange={(event) => {
        setCurrentTab(event.detail.tab)
    }} onIonTabsDidChange={props.onTabsDidChange}  {...props} >
        {props.children}
        {props.tabs.map((tab) => <AppTabButton style={currentTab === tab.path ? { "--color": "var(--ion-color-" + props.selectedColor || "primary" } : {}} tab={tab.path}>
            <AppIcon icon={tab.icon} />
            <AppLabel>
                {tab.title}
            </AppLabel>
            {tab.notifications && <AppBadge color={tab.notificationColor}>
                {tab.notifications}
            </AppBadge>}
        </AppTabButton>)}
        <AppRouterOutlet id={v4()} root={{
            icon: "", path: "*", title: "", nested: [], component: () => <>
                {props.tabs.find(x => x.path === currentTab)?.component}
            </>
        }} >
        </AppRouterOutlet>
    </IonTabs>
};
export default AppTabs;