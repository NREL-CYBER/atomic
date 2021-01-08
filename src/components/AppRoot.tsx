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
import { useAppLayout } from '../hooks';
import "../theme/variables.css";
import { AppConfig } from '../util/AppConfig';
import AppRouter from './AppRouter';
import AppRouterOutlet from './AppRouterOutlet';
import AppBottomToolbar from './global/AppBottomToolbar';
import AppMainMenu from './global/AppMainMenu';
import AppTopToolbar from './global/AppTopToolbar';
import AppCompletion from './completion/AppCompletion';
import AppCache from './serialization/AppCache';



/**
 * Component that stores the root of the application and control current theme
 */


const AppRoot: React.FC<AppConfig> = ({ rootRoute, sections, schemas, completion }) => {

    const initLayout = useAppLayout(x => x.initialize);

    useEffect(() => {
        initLayout(rootRoute);
    }, [initLayout, rootRoute])




    return <IonApp className="dark-theme">
        <AppRouter id={"root"}>
            <AppCache schemas={schemas} />
            <AppCompletion conditions={completion} />
            <AppMainMenu sections={sections} />
            <AppTopToolbar />
            <AppRouterOutlet id={"root"} root={rootRoute} />
            <AppBottomToolbar />
        </AppRouter>
    </IonApp>
}
export default AppRoot;
