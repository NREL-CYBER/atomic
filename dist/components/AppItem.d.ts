import React, { MouseEventHandler } from 'react';
import { AppColor } from '../theme/AppColor';
import { AppRoute } from '../core/routing';
interface itemProps {
    destination?: AppRoute;
    color?: AppColor;
    onClick?: MouseEventHandler;
    detail?: boolean;
    routerLink?: string;
    href?: string;
    lines?: "full" | "inset" | "none";
    disabled?: boolean;
    className?: string;
}
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
declare const AppItem: React.FC<itemProps>;
export default AppItem;
