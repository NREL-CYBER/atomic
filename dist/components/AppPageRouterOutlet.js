import { IonRouterOutlet } from '@ionic/react';
import React from 'react';
/**
 * Component for the routing of all the root pages
 */

const AppPageRouterOutlet = props => <IonRouterOutlet id='main' animated={false} {...props} />;

export default AppPageRouterOutlet;