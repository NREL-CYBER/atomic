import React from 'react';
import useAppLayout from '../hooks/useAppLayout';
import useCompletion from '../hooks/useCompletion';
import AppIcon from './AppIcon';
import AppItem from './AppItem';
import AppLabel from './AppLabel';
import { AppRoute } from '../core/routing';
import { AppButtons } from 'atomic';






interface SubMenuProps {
    pages: AppRoute[]
}

const AppSubMenu: React.FC<SubMenuProps> = ({ pages }) => {
    const currentPath = useAppLayout(x => x.path);
    const { pathStatusColor, isUnlocked } = useCompletion();
    return <>{pages
        .map(p => {
            const isCurrentPath = currentPath === p.path;
            const currentPathStatusColor = isCurrentPath ? "dark" : pathStatusColor(p.path);
            return <AppItem lines="none" key={p.path
            } color={isCurrentPath ? 'tertiary' : "clear"} routerLink={isUnlocked(p.path) ? p.path : undefined}>
                <AppButtons slot="start">
                    <AppIcon color={currentPathStatusColor} slot="start" icon={p.icon} />
                </AppButtons>
                <AppButtons slot="start">
                    <AppLabel color={currentPathStatusColor} >{p.title}</AppLabel>
                </AppButtons>
            </AppItem>
        }
        )}</>
};
export default AppSubMenu;