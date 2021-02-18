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
  const [pageEections] = useState(Object.entries(sections));
  const { pathStatusColor, isUnlocked } = useCompletion();

  function renderlistItems(list: AppRoute[]) {
    return list
      .filter(route => !!route.path)
      .map(r => {
        const pathColor = pathStatusColor(r.path);
        const isLocked = !isUnlocked(r.path);
        const isOnPath = path.startsWith(r.path);
        return (
          <AppMenuToggle key={r.title} auto-hide="false">
            <AppItem disabled={isLocked} detail={false} routerLink={r.path} color={isOnPath ? 'tertiary' : undefined}>
              <AppIcon color={isOnPath ? "medium" : pathColor} slot="start" icon={r.icon} />
              <AppLabel color={isOnPath ? "medium" : pathColor}>{r.title}</AppLabel>
            </AppItem>
          </AppMenuToggle>
        )
      });
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