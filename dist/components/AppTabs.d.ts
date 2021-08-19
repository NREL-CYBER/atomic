import React from 'react';
interface tabsProps {
    style?: Record<string, any>;
    onTabsWillChange?: () => void;
    onTabsDidChange?: () => void;
    children: React.ReactNode;
}
/**
 * Component to display text with optional color
 */
declare const AppTabs: React.FC<tabsProps>;
export default AppTabs;
