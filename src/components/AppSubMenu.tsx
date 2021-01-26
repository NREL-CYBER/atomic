import React from 'react';
import useAppLayout from '../hooks/useAppLayout';
import useCompletion from '../hooks/useCompletion';
import AppIcon from './AppIcon';
import AppItem from './AppItem';
import AppLabel from './AppLabel';
import { AppRoute } from '../core/routing';






interface SubMenuProps {
    pages: AppRoute[]
}

const AppSubMenu: React.FC<SubMenuProps> = ({ pages }) => {
    const currentPath = useAppLayout(x => x.path);
    const { pathStatusColor, isUnlocked } = useCompletion();
    return <>{pages
        .map(p => (
            <AppItem key={p.path} color={currentPath === p.path ? 'tertiary' : "dark"} routerLink={isUnlocked(p.path) ? p.path : undefined}>
                <AppIcon color={pathStatusColor(p.path)} slot="start" icon={p.icon} />
                <AppLabel color={pathStatusColor(p.path)} >{p.title}</AppLabel>
            </AppItem>
        ))}</>
};
export default AppSubMenu;