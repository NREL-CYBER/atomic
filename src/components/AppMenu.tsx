import { IonMenu } from '@ionic/react';
import React from 'react';
import { AppColor } from '../theme/AppColor';


interface appMenuProps {
    color?: AppColor
    side: "start" | "end"
    contentId: string
    type?: "push"|"overlay"|"reveal"
}

/**
 * Component for Side Drawer Menus
 */
const AppMenu: React.FC<appMenuProps> = (props) => <IonMenu type="" {...props} />

export default AppMenu;