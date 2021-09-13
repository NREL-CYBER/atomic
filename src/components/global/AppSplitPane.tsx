/**
 * Next step button
 */

import { IonSplitPane } from "@ionic/react";
import React from "react";

export const AppSplitPane: React.FC<{ contentId: string }> = ({ contentId = "main", children }) => {
    return <IonSplitPane when="xs" contentId="root">
        {children}
    </IonSplitPane>
}
