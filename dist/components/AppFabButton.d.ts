import React, { MouseEventHandler } from 'react';
import { AppColor } from '../theme/AppColor';
interface itemProps {
    onClick?: MouseEventHandler;
    disabled?: boolean;
    color?: AppColor;
    size?: "small";
}
/**
* Floating action button, put this inside an AppFab
*/
declare const AppFabButton: React.FC<itemProps>;
export default AppFabButton;
