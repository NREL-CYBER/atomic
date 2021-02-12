import React from 'react';
import { AppColor } from '../theme/AppColor';
interface appMenuProps {
    color?: AppColor;
    side: "start" | "end";
    contentId: string;
    type?: "push" | "overlay" | "reveal";
}
/**
 * Component for Side Drawer Menus
 */
declare const AppMenu: React.FC<appMenuProps>;
export default AppMenu;
