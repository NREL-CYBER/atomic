import { AppButtons } from 'atomic';
import React, { memo, useState } from 'react';
import { AppIcon, AppItem, AppLabel, AppList, AppListHeader, AppMenu, AppMenuToggle } from '..';
import { AppRoute } from '../../core/routing';
import { useAppLayout, useCompletion } from '../../hooks';



interface MenuProps {
  sections: Record<string, AppRoute[]>
}




/**
 * @param sections  a key value object containing all sections of routes 
 */
export const AppFixedMainMenu: React.FC<MenuProps> = ({ sections }) => {
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
          <AppItem key={r.path} detail={false} routerLink={isPathUnlocked ? r.path : undefined} color={isOnPath ? 'tertiary' : "clear"}>
            <AppButtons slot="start">
              <AppIcon color={isOnPath ? "medium" : pathColor} slot="start" icon={r.icon} />
            </AppButtons>
            <AppLabel color={isOnPath ? "medium" : pathColor}>{r.title}</AppLabel>
          </AppItem>
        )
      });
  }
  return <div>

    {
      pageSections.map(([section, routes]) =>
        <AppList lines="none" key={section}>
          {renderlistItems(routes)}
        </AppList>
      )
    }
  </div >
};

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
              <AppButtons slot="start">
                <AppIcon color={isOnPath ? "medium" : pathColor} slot="start" icon={r.icon} />
              </AppButtons>
              <AppLabel color={isOnPath ? "medium" : pathColor}>{r.title}</AppLabel>
            </AppItem>
          </AppMenuToggle>
        )
      });
  }


  return <AppMenu type='overlay' side='start' contentId={"main"} >
    {pageSections.map(([section, routes]) =>
      <AppList lines="none" key={section}>
        <AppListHeader>{section}</AppListHeader>
        {renderlistItems(routes)}
      </AppList>
    )}
  </AppMenu >

};
export default memo(AppMainMenu);