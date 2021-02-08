import { FC } from "react";
import { AppColor } from "..";
declare type accordionItem = {
    toolbarContent: FC;
    innerContent: FC;
};
export interface accordionProps {
    items: accordionItem[];
    itemColor?: AppColor;
    selectedColor?: AppColor;
    expand?: boolean;
}
/**
 *
 * @param accordionOptions items:[]accordionItem[],
 */
declare const AppAccordion: FC<accordionProps>;
export default AppAccordion;
