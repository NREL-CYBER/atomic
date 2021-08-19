import { IonTabs } from '@ionic/react';
import React from 'react';


interface tabsProps {
    style?: Record<string, any>
    onTabsWillChange?: () => void
    onTabsDidChange?: () => void
    children: React.ReactNode
}

/**
 * Component to display text with optional color
 */
const AppTabs: React.FC<tabsProps> = (props) => {
    return <IonTabs onIonTabsWillChange={props.onTabsWillChange} onIonTabsDidChange={props.onTabsDidChange}  {...props} />
};
export default AppTabs;