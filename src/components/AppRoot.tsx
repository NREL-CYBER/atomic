import { IonApp } from '@ionic/react';
import React from 'react';



/**
 * Component that stores the root of the application and control current theme
 */
const AppRoot: React.FC = (props) =>
    <IonApp className="dark-theme" {...props} />

export default AppRoot;
