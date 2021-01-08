import { IonLoading } from '@ionic/react';
import React from 'react';

/**
 * Component to show a loading overlay on the application
 */
const AppLoading = props => {
  return <IonLoading {...props} />;
};

export default AppLoading;