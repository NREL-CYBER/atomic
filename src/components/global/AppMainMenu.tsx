import { AppContent, AppIcon, AppItem, AppLabel, AppList, AppListHeader, AppMenu, AppMenuToggle } from '..';
import React from 'react';
import { useLocation } from 'react-router';
import AppRoute from '../../routing/AppRoute';
import './Menu.css';




interface MenuProps {
  sections: Record<string, AppRoute[]>
}

/**
 * @param sections  a key value object containing all sections of routes 
 */
const AppMainMenu: React.FC<MenuProps> = ({ sections }) => {
  const { pathname } = useLocation();
  function renderlistItems(list: AppRoute[]) {

    return list
      .filter(route => !!route.path)
      .map(p => (
        <AppMenuToggle key={p.title} auto-hide="false">
          <AppItem detail={false} routerLink={p.path} color={pathname.startsWith(p.path) ? 'tertiary' : undefined}>
            <AppIcon slot="start" icon={p.icon} />
            <AppLabel>{p.title}</AppLabel>
          </AppItem>
        </AppMenuToggle>
      ));
  }
  function mainMenu() {
    return <AppContent >
      {Object.entries(sections).map(([section, routes]) => {
        <AppList lines="none">
          <AppListHeader>{section}</AppListHeader>
          {renderlistItems(routes)}
        </AppList>
      })}
    </AppContent>
  }


  return (<AppMenu type='push' side='start' contentId="main" >
    {mainMenu()}
  </AppMenu >
  );
};
export default AppMainMenu;