import { IonApp, IonCol, IonContent, IonFooter, IonGrid, IonRow } from '@ionic/react';
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
import React, { memo, useEffect } from 'react';
import { Route } from 'react-router';
import { AppContent, AppSerializer } from '.';
import { useAppLayout } from '../hooks';
import useAppAccount from '../hooks/useAppAccount';
import { useAppSettings } from '../hooks/useAppSettings';
import useCache from '../hooks/useCache';
import useIndexDBStorage from '../hooks/useLocalSerialization';
import { useRestSerializeation } from '../hooks/useRestSerialization';
import "../theme/variables.css";
import { prettyTitle } from '../util';
import { AppConfig, AppSerializationConfig } from '../util/AppConfig';
import AppChip from './AppChip';
import AppLoadingCard from './AppLoadingCard';
import AppLogin from './AppLogin';
import AppPage from './AppPage';
import AppRouter from './AppRouter';
import AppTitle from './AppTitle';
import AppToolbar from './AppToolbar';
import AppCompletion from './completion/AppCompletion';
import { AppBottomBar } from './global/AppBottomBar';
import AppMainMenu, { AppFixedMainMenu } from './global/AppMainMenu';
import AppNotifications from './global/AppNotifications';
import AppTopToolbar from './global/AppTopToolbar';
/**
 * Component that stores the root of the application and control current theme
 */

import { setupIonicReact } from '@ionic/react';

setupIonicReact({
  mode: 'md'
});
const AppRoot: React.FC<AppConfig> = (config) => {
    const { routes, mainMenu, topBar, bottomBar, children,
        serialization, title, version, cache } = config;
    const { sections } = mainMenu || { sections: {} };
    const { initialize, status } = useAppLayout();
    const { darkMode } = useAppSettings();
    const initializeAccounts = useAppAccount(x => x.initialize);
    const initializeSettings = useAppSettings(x => x.initialize);
    const { ready } = useCache();
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
        config && initializeSettings(config)
        typeof cache === "undefined" && ready();
        return () => {
            console.log("Exit");
        }
    }, [cache, config, initialize, initializeAccounts, initializeSettings, ready])

    const { uid, setUid } = useAppAccount()

    const restSerializationAndNotLoggedIn = (serialization && serialization.rest &&
        serialization.rest && !uid);
    const localSerializationWithEncryptionAndNotLoggedIn = (!uid && serialization && serialization.encryption === "AES256");

    const needs_authentication = restSerializationAndNotLoggedIn || localSerializationWithEncryptionAndNotLoggedIn;


    const { endpoint, serverStatus } = useAppSettings();
    const customizedSerialization: AppSerializationConfig | false = typeof endpoint !== "undefined" && {
        ...serialization,
        mode: "rest",
        rest: { endpoint }
    }
    console.log(status, "status");
    if (needs_authentication && serialization && serialization.rest && typeof uid === "undefined") {
        console.log("needs auth")
        return <IonApp className={darkMode ? "dark-theme" : "light-theme"}>
            <AppContent center>
                <AppNotifications />
                <AppTitle color="tertiary">
                    {title}
                    <AppChip color="primary">
                        {version}
                    </AppChip>
                </AppTitle>
                <AppLogin serialization={config.serialization}
                    authenticate={(username, password, operation, onAuthenticate) => {
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
    const fixedMainMenu = typeof mainMenu?.fixed !== "undefined" && mainMenu.fixed
    return <IonApp className={darkMode ? "dark-theme" : "light-theme"}>
        {serverStatus !== "connected" && cache &&
            < AppSerializer
                context={config.serialization.mode === "local" ? useIndexDBStorage : useRestSerializeation}
                uid={uid}
                serialization={serialization!}
                cache={cache} />}

        {customizedSerialization && cache && < AppSerializer
            context={useRestSerializeation}
            uid={uid}
            serialization={customizedSerialization}
            cache={cache} />}
        {status === "synchronizing" && <>
            <AppToolbar />
            <AppPage fullscreen id="loading">
                <AppLoadingCard color={"tertiary"} title={prettyTitle(status)} message={"plz wait"} />
            </AppPage>
        </>}

        {status === "idle" && <><AppRouter animated={config.animated} id={"root"}>
            <AppCompletion config={config} />
            {topBar && <AppTopToolbar config={config} />}
            {fixedMainMenu ? <IonContent style={{ height: "100%" }} >
                <IonGrid style={{ height: "100%", padding: "0px", margin: "0px" }}>
                    <IonRow style={{ height: "100%", padding: "0px", margin: "0px" }}>
                        <IonCol size="4" style={{ height: "100%", padding: "0px", margin: "0px" }}>
                            <AppContent>
                                {sections && < AppFixedMainMenu sections={sections} />}
                            </AppContent>
                        </IonCol>
                        <IonCol size="20">
                            {routes.map(route => <Route key={route.path} {...route} />)}
                        </IonCol>
                    </IonRow>
                </IonGrid> </IonContent> : <IonContent style={{ height: "100%" }}>
                {sections && < AppMainMenu sections={sections} />}
                {routes.map(route => <Route key={route.path} {...route} />)}
            </IonContent>}
            {bottomBar && <IonFooter>
                <AppBottomBar config={config} />
            </IonFooter>}

            {children}
        </AppRouter>


        </>}
    </IonApp >
}
export default memo(AppRoot);
