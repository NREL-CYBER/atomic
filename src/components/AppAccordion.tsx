import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList } from "@ionic/react";
import React, { FC, ReactFragment, useState } from "react";
import { AppItem, AppRow } from ".";
import { AppColor } from "../theme/AppColor";
import AppList from "./AppList";

type accordionItem = {
    toolbarContent: ReactFragment,
    innerContent?: ReactFragment
}
export interface accordionProps {
    items: accordionItem[]
    itemColor?: AppColor,
    selectedColor?: AppColor
    expand?: boolean,
    multiple?: boolean
}
/**
 * 
 * @param accordionOptions items:[]accordionItem[], 
 */
const AppAccordion: FC<accordionProps> = ({ items, itemColor, selectedColor, expand }) => {

    return <IonAccordionGroup value={expand ? "0" : undefined} >
        {items.map((accordionItem, i) =>
            <IonAccordion value={i.toString()} toggleIcon={typeof accordionItem.innerContent !== "undefined" ? "chevron-down" : ""} disabled={typeof accordionItem.innerContent === "undefined"}>
                <IonItem slot="header">
                    {accordionItem.toolbarContent}
                </IonItem>

                <IonList slot="content">
                    {accordionItem.innerContent}
                </IonList>
            </IonAccordion>
        )}</IonAccordionGroup>
}

export default AppAccordion;