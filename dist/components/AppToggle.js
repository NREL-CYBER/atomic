import { IonToggle } from '@ionic/react';
import React from 'react';

/**
 * Component to get booleans from the user
 */
const AppToggle = props => {
  return <IonToggle onIonChange={e => {
    props.onToggleChange && props.onToggleChange(e.detail.checked);
  }} {...props} />;
};

export default AppToggle;