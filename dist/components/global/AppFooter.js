import { IonToolbar } from '@ionic/react';
import React from 'react';
/**
 * Self aware completion indicating footer
 */

const Footer = ({
  children
}) => {
  return <IonToolbar slot='end' style={{
    height: 50,
    bottom: 0,
    position: 'absolute'
  }}>
    </IonToolbar>;
};

export default Footer;