import { ItemReorderEventDetail } from "@ionic/core"
import { AppBadge, AppButtons, AppChip, AppCol, AppGrid, AppLabel, AppRow, AppText, AppTitle, prettyTitle } from "atomic"
import produce from "immer"
import { isArray } from "lodash"
import React, { useState } from "react"
import { VisualizeValue } from "../AppJsonDisplay"

export interface appTableProps {
    columns: string[]
    data: any[]
}
export interface appListTableProps {
    rows: string[]
    data: any[]
    type?: string
}

export const AppTableList: React.FC<appListTableProps> = ({ rows, data }) => {
    const [rowName, rowNames] = useState(rows.filter(x => x !== "uuid"))
    if (typeof data === "undefined") {
        return <AppChip color="warning">undefined</AppChip>
    }
    return <table style={{ borderRadius: 10, backgroundColor: "rgba(150,150,150,0.1)", width: "100%" }}>
        {
            data && data.map && data.map((item, i) => <div style={{
                backgroundColor: i % 2 === 0 ? "rgba(0,0,0,0.015)" : "rgba(0,0,0,0.05)"
            }}>
                {rowName.filter(x => x !== "uuid").map((row) => {
                    console.log(row, item[row], "table-list")
                    return <>
                        <AppRow>
                            <AppCol>

                                <div style={{
                                    padding: 4,
                                    textAlign: "left"
                                }}>
                                    <AppGrid>
                                        <AppBadge color="clear">
                                            {row}
                                        </AppBadge>
                                    </AppGrid>
                                </div>
                            </AppCol>
                            <AppCol>
                                <div style={{ width: "100%", textAlign: "right", float: 'right' }}>
                                    {typeof item[row] === "object" && <VisualizeValue value={item[row]} propertyInfo={{}} />}
                                    {
                                        ['string', 'number'].includes(typeof item[row]) &&
                                        <AppButtons slot="end">
                                            <AppGrid>
                                                {item[row].length < 100 ? <AppChip>
                                                    {JSON.stringify(item[row])}
                                                </AppChip> : <AppText color="medium">
                                                    {JSON.stringify(item[row])}
                                                </AppText>
                                                }
                                            </AppGrid>
                                        </AppButtons>
                                    }
                                </div>
                            </AppCol>

                        </AppRow>
                    </>

                }

                )}
            </div>
            )
        }
    </table >
}

export const AppTable: React.FC<appTableProps> = ({ columns, data }) => {
    const [columnNames] = useState(columns.filter(x => x !== "uuid"))

    if (typeof data === "undefined" || JSON.stringify(data) === "{}") {
        return <AppChip color="warning">undefined</AppChip>
    } console.log(data, "TABLE DATA");
    return <table style={{ borderRadius: 10, backgroundColor: "rgba(150,150,150,0.1)", width: "100%" }}>
        <tr style={{ borderRadius: 10, backgroundColor: "rgba(2,2,2,0.1)" }}>
            {/* <AppReorderGroup disabled={false} onReorder={doReorder}> */}
            {columnNames.map((name) => <th style={{ textAlign: "left" }}>
                <AppBadge color="light">
                    {prettyTitle(name)}
                </AppBadge>
            </th>
            )}
        </tr>
        {/* </AppReorderGroup> */}
        {
            data && data.map && data.map((item, i) => <tr style={{
                textAlign: "center",
                backgroundColor: i % 2 === 0 ? "rgba(0,0,0,0.015)" : "rgba(0,0,0,0.05)"
            }}>
                {columnNames.map((column) => {
                    // console.log(column, item[column])
                    return < td style={{
                        padding: 10,
                        textAlign: "left",
                        backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "rgba(255,255,255,0.001)"
                    }}>
                        <div style={{
                            textAlign: "left!important" as any
                        }}>
                            <AppLabel>
                                {['string', 'number'].includes(typeof item[column]) && (item[column])}
                            </AppLabel>
                        </div>
                    </td>
                })}
            </tr>
            )
        }
    </table >
}
