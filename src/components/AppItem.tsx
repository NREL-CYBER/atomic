import { IonItem } from '@ionic/react';
import React from 'react';
import AppRoute from 'core/routing/AppRoute';
import { AppColor } from './AppCard';


interface itemProps {
    destination?: AppRoute
    color?: AppColor
    onClick?: () => void
    detail?: boolean
    routerLink?: string
    href?: string
    lines?: "full" | "inset" | "none"
    disabled?: boolean
}

/**
 * Component for items in a list
 * A very nice feature of this component is adding AppButtons inside
 * and attaching them to specific slots 
 * @example \
 * <AppItem>
 *      <AppButtons slot="start">
 *          <AppButton>Great left side button</AppButton>
 *      </AppButtons><AppButtons slot="end">
 *          <AppButton>A right side button</AppButton>
 *      </AppButtons>
 * </AppItem>
 */
const AppItem: React.FC<itemProps> = (props) => {
    return <IonItem {...props} />
};
export default AppItem;