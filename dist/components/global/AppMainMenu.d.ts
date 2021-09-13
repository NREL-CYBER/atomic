import React from 'react';
import { AppRoute } from '../../core/routing';
interface MenuProps {
    sections: Record<string, AppRoute[]>;
}
/**
 * @param sections  a key value object containing all sections of routes
 */
export declare const AppFixedMainMenu: React.FC<MenuProps>;
declare const _default: React.NamedExoticComponent<MenuProps>;
export default _default;
