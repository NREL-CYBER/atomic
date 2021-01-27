import React from 'react';
import { AppColor } from '../theme/AppColor';
interface listProps {
    color?: AppColor;
    className?: string;
    lines?: "none" | "full" | "inset" | undefined;
    id?: string;
}
/**
 * Component designed to store a list of AppItems
 */
declare const AppList: React.FC<listProps>;
export default AppList;
