import useAppLayout from '../../hooks/useAppLayout';
import { homeOutline, closeOutline } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { AppButton, AppButtons, AppIcon, AppMenuButton, AppTitle, AppToolbar, AppChip } from '..';
import { useCompletion } from '../../hooks';




/**
 * Self aware top toolbar
 */

const AppTopToolbar: React.FC = ({ children }) => {
    const { pathname } = useLocation();
    const { paths } = useCompletion();
    const { update, appTitle, version } = useAppLayout();
    const breadcrumbs = useAppLayout(x => x.breadCrumbs);
    const isHome = pathname === '/';
    useEffect(() => {
        update(pathname)
    }, [pathname, update, paths])
    return (<AppToolbar>
        <AppButtons slot='start'>
            <AppMenuButton />
            <AppButton expand='full' routerLink={"/"}>
                <AppTitle color={isHome ? "tertiary" : undefined}><AppIcon icon={homeOutline} /> </AppTitle>
            </AppButton>
            {!isHome && breadcrumbs.map(breadCrumb => <AppButton key={breadCrumb.path} color={breadCrumb.path === pathname ? "tertiary" : undefined} fill={breadCrumb.path === pathname ? "solid" : "clear"} routerLink={breadCrumb.path}>
                <AppTitle>{breadCrumb.title} </AppTitle>  <AppIcon icon={breadCrumb.icon} />
            </AppButton>)}
            {children}
        </AppButtons>
        <AppButtons slot='end'>
            <AppTitle color="tertiary">
                {appTitle}
            </AppTitle>
            <AppChip color="tertiary">
                {version}
            </AppChip>
            <AppButton onClick={() => {
                window.close();
            }}>
                <AppIcon icon={closeOutline} />
            </AppButton>
        </AppButtons>

    </AppToolbar >
    );
};
export default AppTopToolbar;