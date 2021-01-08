import { IonModal } from '@ionic/react';
import React from 'react';

/**
 * Component for modals
 *  
 */
const AppModal = props => <IonModal onDidDismiss={props.onDismiss && props.onDismiss} {...props} />;

export default AppModal;