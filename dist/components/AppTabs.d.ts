import { AppRoute } from 'atomic';
import React from 'react';
import { AppColor } from '../theme';
interface AppTab extends AppRoute {
    notifications?: number;
    notificationColor?: AppColor;
}
interface tabsProps {
    style?: Record<string, any>;
    onTabsDidChange?: () => void;
    tabs: AppTab[];
    selectedColor?: AppColor;
    selectedTab: string;
    height: number;
    slot?: "top" | "bottom";
}
/**
 * Component to display text with optional color
 */
declare const AppTabs: React.FC<tabsProps>;
export default AppTabs;
