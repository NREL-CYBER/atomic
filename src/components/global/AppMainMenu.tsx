import React, { memo } from 'react';
import { AppIcon, AppItem, AppLabel, AppList, AppListHeader, AppMenu, AppMenuToggle } from '..';
import { useAppLayout, useCompletion } from '../../hooks';
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
  const [pageSections] = useState(Object.entries(sections));
  const { pathStatusColor, isUnlocked } = useCompletion();

  function renderlistItems(list: AppRoute[]) {
    return list
      .filter(route => !!route.path)
      .map(r => {
        const pathColor = pathStatusColor(r.path) || "medium";
        const isPathUnlocked = isUnlocked(r.path);
        const isOnPath = path === r.path;
        return (
          <AppMenuToggle key={r.title} auto-hide="false">
            <AppItem detail={false} routerLink={isPathUnlocked ? r.path : undefined} color={isOnPath ? 'tertiary' : "clear"}>
              <AppIcon color={isOnPath ? "medium" : pathColor} slot="start" icon={r.icon} />
              <AppLabel color={isOnPath ? "medium" : pathColor}>{r.title}</AppLabel>
            </AppItem>
          </AppMenuToggle>
        )
      });
  }


  return (<AppMenu type='overlay' side='start' contentId="main" >
    {pageSections.map(([section, routes]) =>
      <AppList lines="none" key={section}>
        <AppListHeader>{section}</AppListHeader>
        {renderlistItems(routes)}
      </AppList>
    )}
  </AppMenu >
  );
};
export default memo(AppMainMenu);