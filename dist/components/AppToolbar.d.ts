import React, { MouseEventHandler } from 'react';
import { AppColor } from '../theme/AppColor';
interface appToolbarProps {
    color?: AppColor;
    slot?: "top" | "bottom";
    onClick?: MouseEventHandler;
}
/**
 * Toolbar component!
 * This once also works great with the AppButtons Component.
 * We use this on the top bar, but we might have a footer later on as well.
 */
declare const AppToolbar: React.FC<appToolbarProps>;
export default AppToolbar;
