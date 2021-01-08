




import { IonSplitPane } from '@ionic/react';
import React from 'react';
import AppList from './AppList';
import AppRouterOutlet, { routerOutletProps } from './AppRouterOutlet';
import AppSubMenu from './AppSubMenu';








/**
 * Component to handle the creation of side menus
 */

const AppSideMenu: React.FC<routerOutletProps> = ({ id, root }) => {
    return <IonSplitPane className="side-bar" when="xs" contentId={id}>
        <AppList >
            {root.nested && <AppSubMenu pages={root.nested} />}
        </AppList>
        <AppRouterOutlet id={id} root={root} />
    </IonSplitPane>

};
export default AppSideMenu;

