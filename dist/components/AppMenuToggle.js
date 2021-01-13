import { IonMenuToggle } from '@ionic/react';
import React from 'react';
/**
 * Component for toggling the main menu on click
 * This is for the left top hamburger button
 * and for all buttons inside the main menu
 *  
 * We're only using one global menu so we did not expose the menuId param
 * If we decide to add a new menu, lets expand the access to inner API
 */

const AppMenuToggle = props => /*#__PURE__*/React.createElement(IonMenuToggle, props);

export default AppMenuToggle;