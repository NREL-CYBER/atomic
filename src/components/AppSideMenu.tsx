




import { IonSplitPane } from '@ionic/react';
import SubMenu from 'components/global/SubMenu';
import React, { useState } from 'react';
import AppList from './AppList';
import AppRouterOutlet, { routerOutletProps } from './AppRouterOutlet';
import useWindowSize from 'hooks/useWindowSize';








/**
 * Component to handle the creation of side menus
 */

const AppSideMenu: React.FC<routerOutletProps> = ({ id, root }) => {
    return <IonSplitPane when="xs" contentId={id}>
        <AppList >
            {root.nested && <SubMenu pages={root.nested} />}
        </AppList>
        <AppRouterOutlet id={id} root={root} />
    </IonSplitPane>

};
export default AppSideMenu;

