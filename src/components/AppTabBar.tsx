import { IonTabBar } from '@ionic/react';
import React from 'react';


interface tabBarProps {
    slot: "top" | "bottom"
    translucent?: boolean
    selectedTab?: string
}

/**
 * Component to display text with optional color
 */
const AppText: React.FC<tabBarProps> = (props) => {
    return <IonTabBar mode='md'  {...props} />
};
export default AppText;