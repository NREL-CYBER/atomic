import React from 'react';
import { AppColor } from '../theme/AppColor';
interface itemProps {
    vertical?: "top" | "bottom";
    horizontal?: "start" | "end";
    slot?: "fixed";
    color?: AppColor;
}
/**
 * Container for a FabButton
 * use vertical and horizontal props for positioning
 */
declare const AppFab: React.FC<itemProps>;
export default AppFab;
