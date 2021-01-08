import { IonPopover } from '@ionic/react';
import React from 'react';

/**
 * Component that stores the root of the application and control current theme
 */
const AppPopover = props => <IonPopover onDidDismiss={() => {
  props.onDismiss();
}} {...props} />;

export default AppPopover;