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
import React, { useEffect } from 'react';
import { Route } from 'react-router';
import { useAppLayout } from '../hooks';
import "../theme/variables.css";
import { AppConfig } from '../util/AppConfig';
import AppRouter from './AppRouter';
import AppBottomToolbar from './global/AppCompletionToolbar';
import AppMainMenu from './global/AppMainMenu';
import AppTopToolbar from './global/AppTopToolbar';
import useDarkMode from '../hooks/useDarkMode';


/**
 * Component that stores the root of the application and control current theme
 */


const AppRoot: React.FC<AppConfig> = ({ routes, sections, bottomBar, topBar, children }) => {

    const { initialize, dark } = useAppLayout();

    useDarkMode(dark);

    useEffect(() => {
        initialize(routes);
    }, [initialize, routes])




    return <IonApp>
        <AppRouter id={"root"}>
            {sections && <AppMainMenu sections={sections} />}
            {topBar ? { topBar } : <AppTopToolbar />}
            {children}
            {routes.map(route =>
                <Route {...route} />
            )}
            {bottomBar ? bottomBar : <AppBottomToolbar />}
        </AppRouter>
    </IonApp>
}
export default AppRoot;
