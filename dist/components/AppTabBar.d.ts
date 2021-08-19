import React from 'react';
interface tabBarProps {
    slot: "top" | "bottom";
    translucent?: boolean;
    selectedTab?: string;
}
/**
 * Component to display text with optional color
 */
declare const AppText: React.FC<tabBarProps>;
export default AppText;
