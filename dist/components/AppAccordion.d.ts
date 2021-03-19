import { FC, ReactFragment } from "react";
import { AppColor } from "../theme/AppColor";
declare type accordionItem = {
    toolbarContent: ReactFragment;
    innerContent: ReactFragment;
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
