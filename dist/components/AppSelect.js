import { IonSelect } from '@ionic/react';
import React from 'react';

/**
 * Component for a select interface
 */
const AppSelect = props => {
  return <IonSelect onIonChange={e => {
    props.onSelectionChange && props.onSelectionChange(e.detail.value);
  }} {...props} />;
};

export default AppSelect;