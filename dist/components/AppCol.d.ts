import React from 'react';
import { AppColor } from '../theme/AppColor';
export declare type columnAmount = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24";
interface itemProps {
    size?: columnAmount;
    sizeMd?: columnAmount;
    sizeLg?: columnAmount;
    sizeXs?: columnAmount;
    color?: AppColor;
}
/**
 * Column in a Grid, use this for splitting a page into multiple column layout
 * page size is 12
 */
declare const AppCol: React.FC<itemProps>;
export default AppCol;
