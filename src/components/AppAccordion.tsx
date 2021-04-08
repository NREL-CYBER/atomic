import React, { FC, useState, ReactFragment } from "react";
import { AppItem, AppRow } from ".";
import AppList from "./AppList";
import { AppColor } from "../theme/AppColor";

type accordionItem = {
    toolbarContent: ReactFragment,
    innerContent: ReactFragment
}
export interface accordionProps {
    items: accordionItem[]
    itemColor?: AppColor,
    selectedColor?: AppColor
    expand?: boolean
}
/**
 * 
 * @param accordionOptions items:[]accordionItem[], 
 */
const AppAccordion: FC<accordionProps> = ({ items, itemColor, selectedColor, expand }) => {
    const [unlockedIndex, setUnlockedIndex] = useState(-1);

    return <AppList>{items.map((accordionItem, i) =>
        <React.Fragment key={i}><AppItem href={"javascript:void(0)"} color={unlockedIndex === i ? selectedColor : itemColor} onClick={() => {
            if (unlockedIndex === i) {
                setUnlockedIndex(-1);
            } else {
                setUnlockedIndex(i)
            }
        }}>
            {accordionItem.toolbarContent}
        </AppItem>
            {((unlockedIndex === i) || expand) && <AppRow>
                {accordionItem.innerContent}
            </AppRow>}
        </React.Fragment >
    )}</AppList>
}

export default AppAccordion;