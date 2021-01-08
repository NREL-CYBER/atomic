import React from 'react';
import useAppLayout from '../hooks/useAppLayout';
import useCompletion from '../hooks/useCompletion';
import AppRoute from '../routing/AppRoute';
import AppIcon from './AppIcon';
import AppItem from './AppItem';
import AppLabel from './AppLabel';






interface SubMenuProps {
    pages: AppRoute[]
}

const AppSubMenu: React.FC<SubMenuProps> = ({ pages }) => {
    const currentPath = useAppLayout(x => x.path);
    const { pathStatusColor, isUnlocked } = useCompletion();
    return <>{pages
        .map(p => (
            <AppItem key={p.path} color={currentPath === p.path ? 'tertiary' : undefined} routerLink={isUnlocked(p.path) ? p.path : undefined}>
                <AppIcon color={currentPath === p.path ? "dark" : pathStatusColor(p.path)} slot="start" icon={p.icon} />
                <AppLabel color={currentPath === p.path ? "dark" : pathStatusColor(p.path)} >{p.title}</AppLabel>
            </AppItem>
        ))}</>
};
export default AppSubMenu;