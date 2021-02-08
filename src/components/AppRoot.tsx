import { IonApp } from '@ionic/react';
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import React, { memo, useEffect, useState } from 'react';
import { Route } from 'react-router';
import { AppContent, AppPage } from '.';
import { useAppLayout } from '../hooks';
import "../theme/variables.css";
import { AppConfig } from '../util/AppConfig';
import AppChip from './AppChip';
import AppLogin from './AppLogin';
import AppRouter from './AppRouter';
import AppTitle from './AppTitle';
import AppBottomToolbar from './global/AppCompletionToolbar';
import AppMainMenu from './global/AppMainMenu';
import AppNotifications from './global/AppNotifications';
import AppTopToolbar from './global/AppTopToolbar';
import AppGuidance from './guidance/AppGuidance';
import AppCloudSerializer from './serialization/AppCloudSerializer';
import AppSerializer from './serialization/AppLocalSerializer';


/**
 * Component that stores the root of the application and control current theme
 */


const AppRoot: React.FC<AppConfig> = ({ routes,
    sections, bottomBar, topBar, darkMode, children,
    serialization, cache, title, version }) => {

    const { initialize } = useAppLayout();

    useEffect(
        () => {
            const className = darkMode ? 'dark-theme' : "light-theme";
            const oldClassName = darkMode ? 'light-theme' : "dark-theme";
            const element = window.document.body;
            element.classList.remove(oldClassName);
            element.classList.add(className);
        },
        [darkMode]
    );

    useEffect(() => {
        initialize(routes);
    }, [initialize, routes])

    const [uid, setUid] = useState<string | undefined>()

    const needs_authentication = serialization && serialization.cloud &&
        serialization.cloud.provider.authentication.required && !uid;
    if (needs_authentication && serialization && serialization.cloud && typeof uid === "undefined") {
        return <IonApp className={darkMode ? "dark-theme" : "light-theme"}>
            <AppPage>
                <AppContent center>
                    <AppTitle color="tertiary">
                        {title}
                        <AppChip color="primary">
                            {version}
                        </AppChip>
                    </AppTitle>
                    <AppLogin cloud={serialization.cloud} onLoginSuccess={(uidCredential) => {
                        setUid(uidCredential);
                    }} />
                </AppContent>
            </AppPage>
        </IonApp>
    }

    return <IonApp className={darkMode ? "dark-theme" : "light-theme"}>
        {serialization && serialization.mode === "local" && <AppSerializer cache={cache} />}
        {serialization && serialization.mode === "cloud" && serialization.cloud && uid &&
            <AppCloudSerializer uid={uid} cloud={serialization.cloud} cache={cache} />}
        <AppRouter id={"root"}>
            {sections && <AppMainMenu sections={sections} />}
            {topBar ? { topBar } : <AppTopToolbar />}
            {children}
            {routes.map(route =>
                <Route key={route.path} {...route} />
            )}
            {bottomBar ? bottomBar : <AppBottomToolbar />}
            <AppNotifications />
            <AppGuidance />
        </AppRouter>
    </IonApp>
}
export default memo(AppRoot);
