import React, { memo } from 'react';
import { AppIcon, AppItem, AppLabel, AppList, AppListHeader, AppMenu, AppMenuToggle } from '..';
import { useAppLayout } from '../../hooks';
import { AppRoute } from '../../core/routing';



interface MenuProps {
  sections: Record<string, AppRoute[]>
}

/**
 * @param sections  a key value object containing all sections of routes 
 */
const AppMainMenu: React.FC<MenuProps> = ({ sections }) => {
  const { path } = useAppLayout();
  function renderlistItems(list: AppRoute[]) {
    return list
      .filter(route => !!route.path)
      .map(p => (
        <AppMenuToggle key={p.title} auto-hide="false">
          <AppItem detail={false} routerLink={p.path} color={path.startsWith(p.path) ? 'tertiary' : undefined}>
            <AppIcon slot="start" icon={p.icon} />
            <AppLabel>{p.title}</AppLabel>
          </AppItem>
        </AppMenuToggle>
      ));
  }
  function mainMenu() {
    return < >
      {Object.entries(sections).map(([section, routes]) =>
        <AppList lines="none" key={section}>
          <AppListHeader>{section}</AppListHeader>
          {renderlistItems(routes)}
        </AppList>
      )}
    </>
  }


  return (<AppMenu type='push' side='start' contentId="main" >
    {mainMenu()}
  </AppMenu >
  );
};
export default memo(AppMainMenu);