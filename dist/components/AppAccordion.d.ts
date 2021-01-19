import React, { FC } from "react";
import { AppColor } from "..";
declare type accordionItem = {
    toolbarContent: React.FC;
    innerContent: React.FC;
};
export interface accordionProps {
    items: accordionItem[];
    itemColor?: AppColor;
    selectedColor?: AppColor;
}
/**
 *
 * @param accordionOptions items:[]accordionItem[],
 */
declare const AppAccordion: FC<accordionProps>;
export default AppAccordion;
