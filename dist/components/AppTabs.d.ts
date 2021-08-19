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
    children: React.ReactNode;
    tabs: AppTab[];
    selectedColor?: AppColor;
}
/**
 * Component to display text with optional color
 */
declare const AppTabs: React.FC<tabsProps>;
export default AppTabs;
