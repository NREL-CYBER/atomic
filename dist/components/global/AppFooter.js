import { IonToolbar } from '@ionic/react';
import React from 'react';
/**
 * Self aware completion indicating footer
 */

const Footer = ({
  children
}) => {
  return /*#__PURE__*/React.createElement(IonToolbar, {
    slot: "end",
    style: {
      height: 50,
      bottom: 0,
      position: 'absolute'
    }
  });
};

export default Footer;