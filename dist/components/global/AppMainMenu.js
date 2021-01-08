import React from 'react';
import { useLocation } from 'react-router-dom';
import { AppIcon, AppItem, AppLabel, AppList, AppListHeader, AppMenu, AppMenuToggle } from '..';

/**
 * @param sections  a key value object containing all sections of routes 
 */
const AppMainMenu = ({
  sections
}) => {
  const {
    pathname
  } = useLocation();

  function renderlistItems(list) {
    return list.filter(route => !!route.path).map(p => <AppMenuToggle key={p.title} auto-hide="false">
          <AppItem detail={false} routerLink={p.path} color={pathname.startsWith(p.path) ? 'tertiary' : undefined}>
            <AppIcon slot="start" icon={p.icon} />
            <AppLabel>{p.title}</AppLabel>
          </AppItem>
        </AppMenuToggle>);
  }

  function mainMenu() {
    return <>
      {Object.entries(sections).map(([section, routes]) => <AppList lines="none" key={section}>
          <AppListHeader>{section}</AppListHeader>
          {renderlistItems(routes)}
        </AppList>)}
    </>;
  }

  return <AppMenu type='push' side='start' contentId="main">
    {mainMenu()}
  </AppMenu>;
};

export default AppMainMenu;