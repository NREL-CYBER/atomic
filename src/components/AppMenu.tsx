import { IonMenu } from '@ionic/react';
import React from 'react';
import { AppColor } from './AppCard';


interface appMenuProps {
    color?: AppColor
    side: "start" | "end"
    contentId: string
    type?:"push"
}

/**
 * Component for Side Drawer Menus
 */
const AppMenu: React.FC<appMenuProps> = (props) => <IonMenu {...props} />

export default AppMenu;