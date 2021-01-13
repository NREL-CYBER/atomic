import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import React from 'react';
import { AppConfig } from '../util/AppConfig';
import "../theme/variables.css";
/**
 * Component that stores the root of the application and control current theme
 */
declare const AppRoot: React.FC<AppConfig>;
export default AppRoot;
