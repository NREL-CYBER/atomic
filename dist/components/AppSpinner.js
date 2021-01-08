import { IonSpinner } from '@ionic/react';
import React from 'react';
/**
 * Component show a spinner while something is loading
 */

const AppSpinner = props => {
  return <IonSpinner name="dots" {...props} />;
};

export default AppSpinner;