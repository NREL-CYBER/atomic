import useAppLayout from '../../hooks/useAppLayout';
import { homeOutline, closeOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { AppButton, AppButtons, AppIcon, AppMenuButton, AppTitle, AppToolbar, AppChip, AppCard } from '..';
import { useCompletion } from '../../hooks';
import AppModal from '../AppModal';
import AppContent from '../AppContent';
import useAppAccount from '../../hooks/useAppAccount';




/**
 * Self aware top toolbar
 */

const AppTopToolbar: React.FC<{ about: React.ReactFragment }> = ({ children, about }) => {
    const { pathname } = useLocation();
    const { paths } = useCompletion();
    const { update, appTitle, version, darkMode } = useAppLayout();
    const breadcrumbs = useAppLayout(x => x.breadCrumbs);
    const isHome = pathname === '/';
    useEffect(() => {
        update(pathname)
    }, [pathname, update, paths])
    const [showAbout, setShowAbout] = useState(false)
    const { setUid } = useAppAccount();

    return (<AppToolbar color={darkMode ? "paper" : "tertiary"}>
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
            <AppModal onDismiss={() => { setShowAbout(false) }} isOpen={showAbout}>
                <AppContent>
                    <AppCard contentColor="light" headerColor="tertiary" title={appTitle + " " + version}>
                        {showAbout && about}
                    </AppCard>
                    <AppButton expand={"full"} fill={"outline"} onClick={() => { setShowAbout(false) }} >OK </AppButton>
                </AppContent>
            </AppModal >

            <AppButton color="tertiary" fill="clear" onClick={() => { setShowAbout(x => !x) }}>
                <AppTitle color="tertiary">
                    {appTitle}
                    <AppChip color="tertiary">
                        {version}
                    </AppChip>
                </AppTitle>
            </AppButton>
            <AppButton onClick={() => {
                window.close();
                setUid(undefined);
            }}>
                <AppIcon icon={closeOutline} />
            </AppButton>
        </AppButtons>

    </AppToolbar >
    );
};
export default AppTopToolbar;