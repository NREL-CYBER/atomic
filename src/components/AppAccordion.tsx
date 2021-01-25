import React, { FC, useState } from "react";
import { AppItem } from ".";
import { AppColor } from "..";
import AppList from "./AppList";

type accordionItem = {
    toolbarContent: React.FC,
    innerContent: React.FC
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
        <React.Fragment key={i}><AppItem color={unlockedIndex === i ? selectedColor : itemColor} onClick={() => {
            if (unlockedIndex === i) {
                setUnlockedIndex(-1);
            } else {
                setUnlockedIndex(i)
            }
        }}>
            <accordionItem.toolbarContent />
        </AppItem>
            {((unlockedIndex === i) || expand) && <AppItem lines={"none"} className="accordion-item">
                <accordionItem.innerContent />
            </AppItem>}
        </React.Fragment >
    )}</AppList>
}

export default AppAccordion;