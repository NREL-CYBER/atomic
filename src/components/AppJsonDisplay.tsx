import { AppCol, AppGrid, AppRow, AppText, AppChip } from "atomic";
import { isArray } from "lodash";
import { PropertyDefinitionRef } from "validator";
import { isNull } from "../util";
import { AppTable, AppTableList } from "./global/AppTable";
import React from "react";
import { useState } from "react";

export const AppJsonDisplay: React.FC<{ customRenderMap?: Record<string, React.FC<{ value: any }>>, value: any, propertyInfo: PropertyDefinitionRef }> = ({ customRenderMap, propertyInfo, value }) => {
    const id = propertyInfo.$id || propertyInfo.$ref;
    const [show, setShow] = useState(false);
    const length = String(JSON.stringify(value)).length;
    const type = typeof value;
    if (!show && length > 100) {
        return <AppChip onClick={() => setShow(true)}>{length} byte {type}</AppChip>
    }
    if (id && customRenderMap && typeof customRenderMap[id] !== "undefined") {
        return customRenderMap[id](value)
    }
    const title = propertyInfo.title || propertyInfo.$ref || propertyInfo.$id || ""


    if (typeof value === "undefined" || isNull(value)) {
        return <></>
    }
    if (typeof value === "string") {
        return <AppGrid>
            <AppRow>
                <AppCol size="2" >
                </AppCol>
                <AppCol size="20">
                    {value.length > 50 ? <AppText>{value}</AppText> : <AppChip>
                        {value}
                    </AppChip>}
                </AppCol>
                <AppCol size="2" >
                </AppCol>
            </AppRow>

        </AppGrid>
    }
    if (typeof value === "object") {

        if (isArray(value)) {
            if (typeof value[0] === "string") {
                return <AppChip>{value.join(",")}</AppChip>
            }
            return <AppCol size="20">
                {<AppTable columns={Object.keys(value[0] || {}).filter(x => x !== "uuid")} data={value} />}
            </AppCol>
        }
        return <AppGrid>
            <AppRow>
                <AppCol size="20">
                    {<AppTableList type={title} rows={Object.keys(value).filter(x => x !== "uuid")} data={[value]} />}
                </AppCol>
            </AppRow>
        </AppGrid>
    }

    return <>{String(value) + " " + typeof (value)}</>
}
export const VisualizeValue = AppJsonDisplay;