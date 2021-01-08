import { IonSearchbar } from '@ionic/react';
import React from 'react';

/**
 * Component for a select interface
 */
const AppSearchBar = props => {
  return <IonSearchbar onIonChange={e => {
    props.onSearchChange && props.onSearchChange(e.detail.value);
  }} {...props} />;
};

export default AppSearchBar;