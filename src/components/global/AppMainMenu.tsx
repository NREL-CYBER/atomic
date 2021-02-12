import React, { memo } from 'react';
import { AppIcon, AppItem, AppLabel, AppList, AppListHeader, AppMenu, AppMenuToggle } from '..';
import { useAppLayout } from '../../hooks';
import { AppRoute } from '../../core/routing';
import { useState } from 'react';



interface MenuProps {
  sections: Record<string, AppRoute[]>
}

/**
 * @param sections  a key value object containing all sections of routes 
 */
const AppMainMenu: React.FC<MenuProps> = ({ sections }) => {
  const { path } = useAppLayout();
  const [pageEections, setSections] = useState(Object.entries(sections));

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


  return (<AppMenu type='overlay' side='start' contentId="main" >
    {pageEections.map(([section, routes]) =>
      <AppList lines="none" key={section}>
        <AppListHeader>{section}</AppListHeader>
        {renderlistItems(routes)}
      </AppList>
    )}
  </AppMenu >
  );
};
export default memo(AppMainMenu);