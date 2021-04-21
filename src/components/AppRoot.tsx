import { IonApp, IonFooter } from '@ionic/react';
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
import { AppContent } from '.';
import { useAppLayout } from '../hooks';
import "../theme/variables.css";
import { AppConfig } from '../util/AppConfig';
import AppChip from './AppChip';
import AppLogin from './AppLogin';
import AppRouter from './AppRouter';
import AppTitle from './AppTitle';
import AppCompletionToolbar from './global/AppCompletionToolbar';
import AppMainMenu from './global/AppMainMenu';
import AppNotifications from './global/AppNotifications';
import AppTopToolbar from './global/AppTopToolbar';
import AppGuidance from './guidance/AppGuidance';
//import AppCloudSerializer from './serialization/AppCloudSerializer';
import AppLocalSerializer from './serialization/AppLocalSerializer';
import AppRestSerializer from './serialization/AppRestSerializer';
import { account } from "../hooks/useAppAccount"
import useAppAccount from '../hooks/useAppAccount';
/**
 * Component that stores the root of the application and control current theme
 */


const AppRoot: React.FC<AppConfig> = (config) => {
    const { routes,
        sections, bottomBar, topBar, children,
        serialization, title, version, cache } = config;
    const { initialize, darkMode, setDarkMode } = useAppLayout();
    const initializeAccounts = useAppAccount(x => x.initialize);
    useEffect(() => {
        config.darkMode && setDarkMode(config.darkMode)
    }, [config.darkMode, setDarkMode])

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
        config && initialize(config);
        config && initializeAccounts(config)
        return () => {
            console.log("Exit");
        }
    }, [config, initialize, initializeAccounts])

    const { uid, setUid } = useAppAccount()

    const restSerializationAndNotLoggedIn = (serialization && serialization.rest &&
        serialization.rest && !uid);

    const localSerializationWithEncryptionAndNotLoggedIn = (!uid && serialization && serialization.encryption === "RSA");

    const needs_authentication = restSerializationAndNotLoggedIn || localSerializationWithEncryptionAndNotLoggedIn;

    if (needs_authentication && serialization && serialization.rest && typeof uid === "undefined") {
        return <IonApp className={darkMode ? "dark-theme" : "light-theme"}>
            <AppContent center>
                <AppNotifications />
                <AppTitle color="tertiary">
                    {title}
                    <AppChip color="primary">
                        {version}
                    </AppChip>
                </AppTitle>
                <AppLogin authenticate={(username: string, password: string, operation, onAuthenticate) => {
                    return new Promise<string>((resolve) => {
                        onAuthenticate("");
                        resolve("")
                    });
                }} onLoginSuccess={(uidCredential) => {
                    setUid(uidCredential);
                }} />
            </AppContent>
        </IonApp>
    }
    return <IonApp className={darkMode ? "dark-theme" : "light-theme"}>
        {/* Local Serializer*/}
        {serialization && serialization.mode === "local" && <AppLocalSerializer serialization={serialization} cache={cache} />}
        {/* Rest Serializer*/}
        {serialization && serialization.mode === "rest" && serialization.rest &&
            <AppRestSerializer serialization={serialization} cache={cache} />}

        <AppRouter id={"root"}>
            {/**Side Menu  */}
            {sections && <AppMainMenu sections={sections} />}
            {topBar ? { topBar } : <AppTopToolbar about={config.about || ""} />}
            {routes && routes.map(route =>
                <Route key={route.path} {...route} />
            )}
            <AppNotifications />
            <AppGuidance />
            <IonFooter>
                <AppCompletionToolbar completion={config.completion} {...bottomBar} />
            </IonFooter>
            {children}
        </AppRouter>
    </IonApp>
}
export default memo(AppRoot);
