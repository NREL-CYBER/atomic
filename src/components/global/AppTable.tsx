import { ItemReorderEventDetail } from "@ionic/core"
import { AppBadge, AppChip, AppCol, AppGrid, AppLabel, AppRow, AppTitle } from "atomic"
import produce from "immer"
import { isArray } from "lodash"
import React, { useState } from "react"

export interface appTableProps {
    columns: string[]
    data: any[]
}
export interface appListTableProps {
    rows: string[]
    data: any[]
    type: string
}

export const AppTableList: React.FC<appListTableProps> = ({ rows, type, data }) => {
    const [rowName, rowNames] = useState(rows.filter(x => x !== "uuid"))
    if (typeof data === "undefined") {
        return <AppChip color="warning">undefined</AppChip>
    }
    return <table style={{ borderRadius: 10, backgroundColor: "rgba(150,150,150,0.1)", width: "100%" }}>
        {
            data && data.map && data.map((item, i) => <div style={{
                backgroundColor: i % 2 === 0 ? "rgba(0,0,0,0.015)" : "rgba(0,0,0,0.05)"
            }}>
                {rowName.filter(x => x !== "uuid").map((row) =>
                    <>
                        <AppRow>
                            <AppCol>

                                <div style={{
                                    padding: 4,
                                    textAlign: "left"
                                }}>
                                    <AppBadge color="clear">
                                        <AppGrid>
                                            {row}
                                        </AppGrid>
                                    </AppBadge>
                                </div>
                            </AppCol>
                            <AppCol>
                                <div style={{ width: "100%", textAlign: "right", float: 'right' }}>
                                    {['object'].includes(typeof item[row]) ? isArray(item[row]) && !['string', 'number'].includes(typeof item[row][0]) ?
                                        < AppTable
                                            columns={Object.keys(item[row][0])} data={item[row]} /> : <>{item[row]}</>
                                        : ['string', 'number'].includes(typeof item[row]) ?
                                            <AppChip>
                                                <AppGrid>
                                                    <AppLabel>
                                                        {item[row]}
                                                    </AppLabel>
                                                </AppGrid>
                                            </AppChip> : <></>}
                                </div>
                            </AppCol>

                        </AppRow>
                    </>
                )}
            </div>
            )
        }
    </table >
}

export const AppTable: React.FC<appTableProps> = ({ columns, data }) => {
    const [columnNames, setColumnNames] = useState(columns.filter(x => x !== "uuid"))

    function doReorder(event: CustomEvent<ItemReorderEventDetail>) {
        // The `from` and `to` properties contain the index of the item
        // when the drag started and ended, respectively
        console.log('Dragged from index', event.detail.from, 'to', event.detail.to);
        const newNames = produce<string[]>(columnNames, (names) => {
            const { from, to } = event.detail;
            names[from] = names.splice(to, 1, names[from])[0]
        });
        setColumnNames(newNames)

        // Finish the reorder and position the item in the DOM based on
        // where the gesture ended. This method can also be called directly
        // by the reorder group
        event.detail.complete();
    }
    if (typeof data === "undefined" || JSON.stringify(data) === "{}") {
        return <AppChip color="warning">undefined</AppChip>
    }

    return <table style={{ borderRadius: 10, backgroundColor: "rgba(150,150,150,0.1)", width: "100%" }}>
        <tr style={{ borderRadius: 10, backgroundColor: "rgba(2,2,2,0.1)" }}>
            {/* <AppReorderGroup disabled={false} onReorder={doReorder}> */}
            {columnNames.map((name) => <th style={{ textAlign: "left" }}>
                <AppTitle>
                    {name}
                </AppTitle>
            </th>
            )}
        </tr>
        {/* </AppReorderGroup> */}
        {
            data && data.map && data.map((item, i) => <tr style={{
                textAlign: "center",
                backgroundColor: i % 2 === 0 ? "rgba(0,0,0,0.015)" : "rgba(0,0,0,0.05)"
            }}>
                {columnNames.map((column) =>
                    <td style={{
                        padding: 10,
                        textAlign: "left",
                        backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "rgba(255,255,255,0.001)"
                    }}>
                        <div style={{
                            textAlign: "left!important" as any
                        }}>
                            <AppLabel>
                                {(item[column])}
                            </AppLabel>
                        </div>
                    </td>
                )}
            </tr>
            )
        }
    </table >
}
