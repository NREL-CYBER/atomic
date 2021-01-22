import React from 'react';
import { AppRoute } from '../..';
interface MenuProps {
    sections: Record<string, AppRoute[]>;
}
/**
 * @param sections  a key value object containing all sections of routes
 */
declare const AppMainMenu: React.FC<MenuProps>;
export default AppMainMenu;
