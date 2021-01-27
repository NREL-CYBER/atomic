import useAppLayout from '../../hooks/useAppLayout';
import { homeOutline } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { AppButton, AppButtons, AppIcon, AppMenuButton, AppTitle, AppToolbar } from '..';
import useDarkMode from '../../hooks/useDarkMode';




/**
 * Self aware top toolbar
 */

const AppTopToolbar: React.FC = ({ children }) => {

    const { pathname } = useLocation();
    const { update } = useAppLayout();
    const breadcrumbs = useAppLayout(x => x.breadCrumbs);
    const isHome = pathname === '/';
    useEffect(() => {
        update(pathname)
    }, [pathname, update])
    return (<AppToolbar>
        <AppButtons slot='start'>
            <AppMenuButton />
            <AppButton expand='full' routerLink={"/"}>
                <AppTitle color={isHome ? "tertiary" : undefined}><AppIcon icon={homeOutline} /> </AppTitle>
            </AppButton>
            {!isHome && breadcrumbs.map(breadCrumb => <AppButton key={breadCrumb.path} color={breadCrumb.path === pathname ? "tertiary" : undefined} fill={breadCrumb.path === pathname ? "outline" : "clear"} routerLink={breadCrumb.path}>
                <AppTitle color={breadCrumb.path === pathname ? "tertiary" : "dark"}>{breadCrumb.title} </AppTitle>  <AppIcon icon={breadCrumb.icon} />
            </AppButton>)}
            {children}
        </AppButtons>
    </AppToolbar >
    );
};
export default AppTopToolbar;