import { IonItem } from '@ionic/react';
import React from 'react';

/**
 * Component for items in a list
 * A very nice feature of this component is adding AppButtons inside
 * and attaching them to specific slots 
 * @example 
 * <AppItem>
 *      <AppButtons slot="start">
 *          <AppButton>Great left side button</AppButton>
 *      </AppButtons><AppButtons slot="end">
 *          <AppButton>A right side button</AppButton>
 *      </AppButtons>
 * </AppItem>
 */
const AppItem = props => {
  return /*#__PURE__*/React.createElement(IonItem, props);
};

export default AppItem;