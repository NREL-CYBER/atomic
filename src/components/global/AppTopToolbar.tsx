import { AppGrid } from 'atomic';
import { homeOutline, searchOutline } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { AppButton, AppButtons, AppChip, AppIcon, AppMenuButton, AppRow, AppTitle, AppToolbar } from '..';
import { useCompletion } from '../../hooks';
import useAppLayout from '../../hooks/useAppLayout';
import { useAppSettings } from '../../hooks/useAppSettings';
import useMediaQuery from '../../hooks/useMediaQuery';
import useTitle from '../../hooks/usePageTitle';
import { AppConfig } from '../../util';
import AppModal from '../AppModal';
import AppSearchBar from '../AppSearchBar';




/**
 * Self aware top toolbar
 */

const AppTopToolbar: React.FC<{ config: AppConfig }> = ({ children, config }) => {
    const { about, search } = config
    const [query, setQuery] = useState<string>("")
    const { pathname } = useLocation();
    const { paths } = useCompletion();
    const { update, appTitle, version } = useAppLayout();
    const { darkMode } = useAppSettings();
    const breadcrumbs = useAppLayout(x => x.breadCrumbs);
    const allRoutes = useAppLayout(x => x.allRoutesFlattened);
    const isHome = pathname === '/';
    const { title, setTitle } = useTitle();
    useEffect(() => {
        update(pathname);
        if (allRoutes.map(x => x.path).includes(pathname)) {
            setTitle(undefined);
        }
    }, [pathname, update, paths, setTitle, allRoutes])
    const [showAbout, setShowAbout] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const titleColor = darkMode ? "tertiary" : "secondary";
    const bgColor = darkMode ? "paper" : "tertiary";
    const searchBar = useRef<HTMLDivElement>(null)
    const hideAbout = typeof about === "undefined"
    useEffect(() => {
        const listener = (e: MouseEvent) => {
            if (!searchBar.current?.contains(e.target as any)) {
                setShowSearch(false);
                setQuery("");
            };
        }
        if (showSearch) {
            window.addEventListener("mousedown", listener);
        } else {
            window.removeEventListener("mousedown", listener);
        }

    }, [showSearch])

    const isDesktop = useMediaQuery("only screen and (min-width: 500px)");
    return <>
        <AppToolbar color={bgColor}>
            <AppButtons slot='start'>
                <AppMenuButton />
                {config.topBar?.start}
                <AppButton expand='full' routerLink={"/"}>
                    <AppTitle color={isHome ? titleColor : undefined}><AppIcon icon={config.topBar?.homeIcon ? config.topBar?.homeIcon : homeOutline} /> </AppTitle>
                </AppButton>
                {!isHome && breadcrumbs.map(breadCrumb =>
                    <AppButton key={breadCrumb.path}
                        color={breadCrumb.path === pathname ? "tertiary" : undefined}
                        fill={breadCrumb.path === pathname ? "solid" : "clear"}
                        routerLink={breadCrumb.path}
                    >
                        {isDesktop && <AppTitle>{breadCrumb.title} </AppTitle>}
                        <AppIcon icon={breadCrumb.icon} />
                    </AppButton>)}
                {title && <AppButton color="tertiary" fill="solid" >
                    <AppTitle>
                        {title}
                    </AppTitle>
                </AppButton>}

                {children}
            </AppButtons>
            <AppButtons slot='end'>
                {config.topBar?.end}
                {!hideAbout && <AppModal smol title={appTitle + " (" + version + ")"} onDismiss={() => { setShowAbout(false) }} isOpen={showAbout}>
                    <AppGrid>
                        <AppRow>
                            {about?.component}
                        </AppRow>
                    </AppGrid>
                </AppModal >}

                {!hideAbout && <AppButton fill="clear" onClick={() => { setShowAbout(x => !x) }}>
                    <AppTitle color={titleColor}>
                        {appTitle}
                        <AppChip color={titleColor}>
                            {version}
                        </AppChip>
                    </AppTitle>
                </AppButton>}
                {search && !showSearch && <AppButton onClick={() => { setShowSearch(x => !x) }}>
                    <AppTitle>
                        <AppIcon color={showSearch ? "primary" : "medium"} icon={searchOutline} />
                    </AppTitle>
                </AppButton>}

            </AppButtons>
        </AppToolbar >
        {showSearch && <div ref={searchBar} id='searchbar' style={{ position: "absolute", top: 50, left: 0, right: 0, height: 60, zIndex: 1000 }}>
            <AppToolbar color='paper'>
                <AppSearchBar focus={showSearch} onQuery={(q) => { setQuery(q) }} />
            </AppToolbar>
            {query && config.search && <config.search query={query} dismiss={() => {
                setQuery("");
                setShowSearch(false);
            }} />}
        </div>}
    </>

};
export default AppTopToolbar;