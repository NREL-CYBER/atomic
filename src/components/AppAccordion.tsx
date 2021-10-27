import React, { FC, ReactFragment, useState } from "react";
import { AppItem, AppRow } from ".";
import { AppColor } from "../theme/AppColor";
import AppList from "./AppList";

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
        // eslint-disable-next-line no-script-url
        <React.Fragment key={i}><AppItem color={unlockedIndex === i ? selectedColor : itemColor} onClick={() => {
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