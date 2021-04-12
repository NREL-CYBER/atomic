import { AppButtons, AppCol, AppGrid, AppIcon, AppItem, AppRow, AppTitle } from ".";
import { chevronDownOutline, chevronForwardOutline } from "ionicons/icons";
import React, { FC, ReactFragment, useState } from "react";
import { AppColor } from "../theme";

const AppFoldingNode: FC<{ color?: AppColor, folded?: boolean, titleText?: boolean, title: ReactFragment, centerContent?: ReactFragment, endContent?: ReactFragment, hideIcon?: boolean }> = ({ centerContent, children, title, color, endContent, hideIcon, titleText, folded }) => {
    const [isFolded, setFolded] = useState<boolean>(typeof folded !== "undefined" ? folded : true);
    return <>
        <AppItem href={"javascript:void(0)"} onClick={() => {
            setFolded(x => !x);
        }}>
            <AppButtons slot="start">
                {!hideIcon && <AppIcon color={color} icon={!isFolded ? chevronDownOutline : chevronForwardOutline} />}
                {titleText ? <AppTitle color={color}> {title}
                </AppTitle> : title}
            </AppButtons>
            {centerContent && centerContent}
            <AppButtons slot="end">
                {endContent && endContent}
            </AppButtons>
        </AppItem>
        {!isFolded && <AppGrid>
            <AppRow>
                <AppCol size={"1"} />
                <AppCol size={"23"}>
                    {children}
                </AppCol>
            </AppRow>
        </AppGrid>
        }
    </>
}
export default AppFoldingNode