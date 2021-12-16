import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList } from "@ionic/react";
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

    return <IonAccordionGroup>
        {items.map((accordionItem, i) =>
            // eslint-disable-next-line no-script-url
            <IonAccordion value={i.toString()}>
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