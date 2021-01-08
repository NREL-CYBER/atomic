import { IonButtons } from '@ionic/react';
import React from 'react';

/**
 * Buttons Component allows for specific button placements on an App Item
 * 
 * @example <AppItem><AppButtons slot="start">Left aligned button<AppButtons/><AppItem/>
 * 
 */
const AppButtons = props => {
  return <IonButtons {...props} />;
};

export default AppButtons;